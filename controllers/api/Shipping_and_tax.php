<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;
use Lib\Calc_payment;
use Config\Secret;


class Shipping_and_tax extends Controller 
{
	public function __construct() 
	{
		$this->temp_cart = $this->load_model('temp_cart_model');
		parent::__construct();
	}

	public function index()
	{
		$data = Utils::json_read();
		$error = (object)[];

		$verified = Calc_payment::verify_products($data['order']);

		if (!$verified) {
			http_response_code(500);
			echo json_encode(['error' => "Sorry, there was a problem calculating this order. Please try again or contact us to make an order. We're sorry for the inconvenience."]);
		} else {
			$subtotal = Calc_payment::calc_subtotal($data['order']);
			if ($subtotal < 4800) {
				$error->error = 'Sorry, looks like this order is less than $48 (the minimum order amount before shipping). Feel free to add more items to reach this amount.';
				Utils::json_respond(JWT_PROCESSING_ERROR, $error);
			}
			$shipping_obj = Calc_payment::calc_shipping($data['order']);
			$shipping_cost = $shipping_obj->grand_total_before_tax;
			if ($data['order']['pickup'] !== 'yes' && $shipping_cost == 0) {
				$error->error = 'There was an error calculating shipping to your address. Please try again or contact us to make an order. We apololgize for the inconvinience';
				Utils::json_respond(JWT_PROCESSING_ERROR, $error);
			}
			$tax = Calc_payment::calc_tax($data['order'], $shipping_cost);

			// remove later
			// **************************************
			// **************************************
			if (isset($data['order']['test'])) {
				if ($data['order']['test'] == 25465) {
					$shipping_cost = 0;
					$tax = 0;
				}
			}
			// **************************************
			// **************************************
			$total = $subtotal + $shipping_cost + $tax;
			
			$stripeSecretKey = Secret::keys('STRIPE_API_KEY');
			$stripe = new \Stripe\StripeClient($stripeSecretKey);

			$products = [];
			foreach ($data['order']['products'] as $product) {
				$products[] = (object) ['id' => $product['id'], 'quantity' => $product['quantity']];
			}

			$products = json_encode($products);

			$metadata = [
					  		'customer_message' => $data['order']['message'],
					  		'products' => $products,
					  		'subtotal' => $subtotal,
					  		'shipping' => $shipping_cost,
					  		'box_count' => $shipping_obj->box_count,
					  		'tax' => $tax,
					  		// 'email' => $data['order']['email'],
					  	];

			$stripe->paymentIntents->update(
			  $data['order']['paymentIntentId'],
			  [
			  	'amount' => $total,
			  	'metadata' => $metadata,
			  	'receipt_email' => $data['order']['email'],
			  	'description' => '(created by Nature With Us)'
			  	// add this information when you decide to use a tracking number, meanwhile the shipping el fills this in
			  	// 'shipping' => [
			  	// 	'tracking_number' => 'todo',
			  	//	'address' => [],
			  	// ]
			  ]
			);

			$response = (object) [
				'shipping' => $shipping_cost,
				'tax' => $tax,
				'total' => $total,
			];

			$this->temp_cart->add(['payment_intent_id' => $data['order']['paymentIntentId'], 'products' => json_encode($data['order']['products'])]);
			
			Utils::json_respond(SUCCESS_RESPONSE, $response);
		}
	}
}