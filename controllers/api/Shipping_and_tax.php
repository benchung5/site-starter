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

		$verified = Calc_payment::verify_products($data['order']);

		if (!$verified) {
			http_response_code(500);
			echo json_encode(['error' => "Sorry, there was a problem calculating this order. Try again or contact us for help. We're sorry for the inconvenience."]);
		} else {
			$subtotal = Calc_payment::calc_subtotal($data['order']);
			$shipping_cost = Calc_payment::calc_shipping($data['order']);
			$tax = Calc_payment::calc_tax($data['order']);
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
					  		'shipping' => $shipping_cost,
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