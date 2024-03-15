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
		parent::__construct();
	}

	public function index()
	{
		$data = Utils::json_read();

		$verified = Calc_payment::verify_products($data['order']);

		if (!$verified) {
			http_response_code(500);
			echo json_encode(['error' => "sorry, cart items don't match existing products. Try again or contact us for help"]);
		} else {
			$subtotal = Calc_payment::calc_subtotal($data['order']);
			$shipping_cost = Calc_payment::calc_shipping($data['order']);
			$tax = Calc_payment::calc_tax($data['order']);
			$total = $subtotal + $shipping_cost + $tax;
			$total = intval($total * 100);
			
			$stripeSecretKey = Secret::keys('STRIPE_API_KEY');
			$stripe = new \Stripe\StripeClient($stripeSecretKey);

			$stripe->paymentIntents->update(
			  $data['order']['paymentIntentId'],
			  [
			  	'amount' => $total,
			  	'metadata' => [
			  		// 'order_id' => '6735',
			  		'customer_message' => $data['order']['message'],
			  		'products' => json_encode($data['order']['products']),
			  		'shipping' => $shipping_cost,
			  		'tax' => $tax,
			  		'email' => $data['order']['email'],
			  	],
			  	// 'receipt_email' => $data['order']['email'],
			  	'description' => '(created by Nature With Us)'
			  	// add this information when you decide to use a tracking number, meanwhile the shipping el fills this in
			  	// 'shipping' => [
			  	// 	'tracking_number' => 'todo',
			  	//	'address' => [],
			  	// ]
			  ]
			);

			$result = (object) [
				'shipping' => $shipping_cost,
				'tax' => $tax,
			];

			Utils::json_respond(SUCCESS_RESPONSE, $result);
		}
	}
}