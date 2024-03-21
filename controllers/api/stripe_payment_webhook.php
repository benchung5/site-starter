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
    $this->payment_transactions = $this->load_model('payment_transactions_model');
    $this->temp_cart = $this->load_model('temp_cart_model');
    parent::__construct();
  }

  public function index()
  {
    // webhook.php
    //
    // Use this sample code to handle webhook events in your integration.
    //
    // 1) Paste this code into a new file (webhook.php)
    //
    // 2) Install dependencies
    //   composer require stripe/stripe-php
    //
    // 3) Run the server on http://localhost:4242
    //   php -S localhost:4242

    // require 'vendor/autoload.php';

    // The library needs to be configured with your account's secret key.
    // Ensure the key is kept out of any version control system you might be using.
    $stripeSecretKey = Secret::keys('STRIPE_API_KEY');
    $stripe = new \Stripe\StripeClient($stripeSecretKey);

    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    $endpoint_secret = 'whsec_6fa8dc72fd0596811364a7ce129abc61a3cfc5e2cb13cfd7cb49bada848bb236';

    $payload = @file_get_contents('php://input');
    $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
    $event = null;

    try {
      $event = \Stripe\Webhook::constructEvent(
        $payload, $sig_header, $endpoint_secret
      );
    } catch(\UnexpectedValueException $e) {
      // Invalid payload
      http_response_code(400);
      exit();
    } catch(\Stripe\Exception\SignatureVerificationException $e) {
      // Invalid signature
      http_response_code(400);
      exit();
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
        case 'payment_intent.succeeded':
          $paymentIntent = $event->data->object;

          $transaction = [];
          $transaction['payment_intent_id'] = $paymentIntent->id;
          $transaction['amount'] = $paymentIntent->amount;
          $transaction['amount_received'] = $paymentIntent->amount_received;
          $transaction['description'] = $paymentIntent->description;
          $transaction['name'] = $paymentIntent->shipping->name;
          $transaction['phone'] = $paymentIntent->shipping->phone;
          $transaction['city'] = $paymentIntent->shipping->address->city;
          $transaction['line1'] = $paymentIntent->shipping->address->line1;
          $transaction['line2'] = $paymentIntent->shipping->address->line2;
          $transaction['postal_code'] = $paymentIntent->shipping->address->postal_code;
          $transaction['state'] = $paymentIntent->shipping->address->state;
          // $transaction['metadata'] = $paymentIntent->metadata->toJSON();
          $transaction['created'] = $paymentIntent->created;
          $transaction['canceled_at'] = $paymentIntent->canceled_at;
          $transaction['cancellation_reason'] = $paymentIntent->cancellation_reason;

          $result = $this->temp_cart->get_products($paymentIntent->id);
          
          $transaction['products'] = json_encode($result->products);

          $order_id = $this->payment_transactions->add($transaction);

          //clear this entry from temp cart
          $this->temp_cart->remove($paymentIntent->id);

          // //send customer confirmation email
          // Utils::dbug($paymentIntent->metadata->email);
          $email_body = 'order# ' . $order_id;
          Send_email::send('info@naturewithus.com', 'Your Order Confirmation - naturewithus.com', $email_body );
          //Send_email::send($paymentIntent->metadata->email, 'Your Order Confirmation - naturewithus.com', $email_body );

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
