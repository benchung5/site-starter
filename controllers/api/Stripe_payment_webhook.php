<?php
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;
use Lib\Send_email;
use Config\Secret;

class Stripe_payment_webhook extends Controller 
{
  public function __construct() 
  {
    $this->orders = $this->load_model('orders_model');
    $this->temp_cart = $this->load_model('temp_cart_model');
    $this->orders_products = $this->load_model('orders_products_model');
    $this->products = $this->load_model('products_model');
    parent::__construct();
  }

  public function index()
  {
    // The library needs to be configured with your account's secret key.
    // Ensure the key is kept out of any version control system you might be using.
    $stripeSecretKey = Secret::keys('STRIPE_API_KEY');
    $stripe = new \Stripe\StripeClient($stripeSecretKey);

    // Replace the below endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks (click 'reveal' under Signing secret in webhooks)

    $endpoint_secret = Secret::keys('ENDPOINT_SECRET');


    $payload = @file_get_contents('php://input');
    $event = null;

    try {
      $event = \Stripe\Event::constructFrom(
        json_decode($payload, true)
      );
    } catch(\UnexpectedValueException $e) {
      // Utils::dbug('Invalid payload:');
      // Utils::dbug($e);
      // Invalid payload
      echo '⚠️  Webhook error while parsing basic request.';
      http_response_code(400);
      exit();
    }
    if ($endpoint_secret) {
      // Only verify the event if there is an endpoint secret defined
      // Otherwise use the basic decoded event
      $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
      try {
        $event = \Stripe\Webhook::constructEvent(
          $payload, $sig_header, $endpoint_secret
        );
      } catch(\Stripe\Exception\SignatureVerificationException $e) {
        // Utils::dbug('Invalid signature:');
        // Utils::dbug($e);
        // Invalid signature
        echo '⚠️  Webhook error while validating signature.';
        http_response_code(400);
        exit();
      }
    }

    try {
      // Handle the event
      switch ($event->type) {
        case 'payment_intent.amount_capturable_updated':
          $paymentIntent = $event->data->object;
        case 'payment_intent.canceled':
          $paymentIntent = $event->data->object;
        case 'payment_intent.created':
          $paymentIntent = $event->data->object;
        // case 'payment_intent.updated':
        //   $paymentIntent = $event->data->object;
        case 'payment_intent.partially_funded':
          $paymentIntent = $event->data->object;
        case 'payment_intent.payment_failed':
          $paymentIntent = $event->data->object;
          $error_message = $paymentIntent->last_payment_error ? $paymentIntent->last_payment_error->message : "";
          // Utils::dbug($error_message);
        case 'payment_intent.processing':
          $paymentIntent = $event->data->object;
        case 'payment_intent.requires_action':
          $paymentIntent = $event->data->object;
        case 'payment_method.attached':
          $paymentMethod = $event->data->object; // contains a \Stripe\PaymentMethod
          // Then define and call a method to handle the successful attachment of a PaymentMethod.
          // handlePaymentMethodAttached($paymentMethod);
          break;
        case 'payment_intent.succeeded':
          //Utils::dbug("entering - payment_intent.succeeded");
          $paymentIntent = $event->data->object;
          $metadata = $paymentIntent->metadata->toArray();

          $transaction = [];
          $transaction['payment_intent_id'] = $paymentIntent->id;
          $transaction['amount'] = $paymentIntent->amount;
          $transaction['amount_received'] = $paymentIntent->amount_received;
          $transaction['description'] = $paymentIntent->description;
          $transaction['email'] = $paymentIntent->receipt_email;
          $transaction['name'] = $paymentIntent->shipping->name;
          $transaction['phone'] = $paymentIntent->shipping->phone;
          $transaction['city'] = $paymentIntent->shipping->address->city;
          $transaction['line1'] = $paymentIntent->shipping->address->line1;
          $transaction['line2'] = $paymentIntent->shipping->address->line2;
          $transaction['postal_code'] = $paymentIntent->shipping->address->postal_code;
          $transaction['state'] = $paymentIntent->shipping->address->state;
          $transaction['subtotal'] = $metadata['subtotal'];
          $transaction['shipping'] = $metadata['shipping'];
          $transaction['box_count'] = $metadata['box_count'];
          $transaction['tax'] = $metadata['tax'];
          $transaction['created'] = $paymentIntent->created;
          $transaction['canceled_at'] = $paymentIntent->canceled_at;
          $transaction['cancellation_reason'] = $paymentIntent->cancellation_reason;
          $transaction['order_summary'] = '';

          $result = $this->temp_cart->get_products($paymentIntent->id);
          $products = json_decode($result->products);
          foreach ($products as $product) {
            //format the price
            $product->price = number_format(($product->price/100), 2);
            //create a summary
            $product->summary = $product->commonName." - ".$product->productTypeName." (".$product->productTypeVariationName.")  $".$product->price." x ".$product->quantity;
          }
          foreach ($products as $product) {
            //construct the order summary of products
            $transaction['order_summary'] .= $product->summary."\n---------------------------------------------------\n";
          }
          $order_id = $this->orders->add($transaction);
          foreach ($products as $product) {
            //add product associations to order
            $this->orders_products->add(['order_id' => $order_id, 'product_id' => $product->id, 'quantity' => $product->quantity]);
            //update product quantities
            $existing_product = $this->products->get(['id' => $product->id]);
            $new_quantity = intval($existing_product->amount_available) - intval($product->quantity);
            Utils::dbug($new_quantity);
            $this->products->update([
              'where' => ['id' => $product->id], 
              'update' => ['amount_available' => $new_quantity],
            ]);
            //if no more available, update the status to "out of stock"
            $updated_product = $this->products->get(['id' => $product->id]);
            if ($updated_product->amount_available == 0) {
              $this->products->update([
                'where' => ['id' => $product->id], 
                'update' => ['status_id' => 3],
              ]);
            }
          }

          //clear this entry from temp cart
          $this->temp_cart->remove($paymentIntent->id);

          // //send customer confirmation email
          $amount = number_format(($transaction['amount']/100), 2);
          $subtotal = number_format(($transaction['subtotal']/100), 2);
          $tax = number_format(($metadata['tax']/100), 2);
          $shipping = number_format(($metadata['shipping']/100), 2);

          $email_body = 'Thank you for your business! Below are your order details...<br><br>'.
          'customer name: ' . $transaction['name'].'<br>'.
          'customer email: ' . $transaction['email'].'<br>'.
          '<b>order# ' . $order_id.'</b><br><br>';
          
          $email_body .= 'items:<br>---------------------------------------------------<br>';
          foreach ($products as $product) {
            //construct the order summary of products
            $email_body .= $product->summary."<br>---------------------------------------------------<br>";
          }

          $email_body .= 'subtotal: $'.$subtotal.'<br>'.
          'shipping: $'.$shipping.'<br>'.
          'tax: $'.$tax.'<br>'.
          '<b>total: $'.$amount.'</b><br><br>'.
          '<b>shipping address:</b><br>'.
          $transaction['name'].'<br>'.
          $transaction['line1'].'<br>';

          if ($transaction['line2']) {
            $email_body .= $transaction['line2'].'<br>';
          }

          $email_body .= $transaction['city'].', '.$transaction['state'].'<br>'.
          $transaction['postal_code'].'<br><br>';

          $email_body .= "If you have any questions, please don't hesitate to contact us:<br>info@naturewithus.com<br>250-981-1324";

          // Utils::dbug("$paymentIntent: ", $paymentIntent);
          // Utils::dbug("$metadata: ", $metadata);
          // Utils::dbug("$order_id: ",$order_id);
          // Utils::dbug("$email_body: ",$email_body);

          Send_email::send($transaction['email'], 'Your Order Confirmation - naturewithus.com', $email_body );
          //Send_email::send($paymentIntent->metadata->email, 'Your Order Confirmation - naturewithus.com', $email_body );
          break;
        case 'charge.succeeded':
          // old stripe event, ignore this one
        default:
          // Utils::dbug('Received unknown event type ' . $event->type);
          echo 'Received unknown event type ' . $event->type;
      } 
    } catch (Exception $e) {
        // Utils::dbug($e->getMessage());
    }

    http_response_code(200);
  }
}
