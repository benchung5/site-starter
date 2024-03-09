<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;
use Lib\Uri;
use Config\Secret;


class Checkout extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index()
	{

		$stripeSecretKey = Secret::keys('STRIPE_API_KEY');
		$stripe = new \Stripe\StripeClient($stripeSecretKey);

		// $stripe->tax->registrations->create([
		//   'country' => 'CA',
		//   'country_options' => [
		//     'ca' => [
		//       'province' => 'BC',
		//       'type' => 'province_standard',
		//     ],
		//   ],
		//   'active_from' => 'now',
		// ]);

		function calculate_order_amount(array $products, $shipping=0): int {
		    // Replace this constant with a calculation of the order's amount
		    // Calculate the order total on the server to prevent
		    // people from directly manipulating the amount on the client
		    // include shipping
		    return 1400;
		}

		function get_order_id()
		{
			//get the next available order ID from the DB
			return 34534;
		}

		header('Content-Type: application/json');

		try {
		    // retrieve JSON from POST body
		    $jsonStr = file_get_contents('php://input');
		    $jsonObj = json_decode($jsonStr);

		    // Create a PaymentIntent with amount and currency
		    $paymentIntent = $stripe->paymentIntents->create([
		        'amount' => calculate_order_amount($jsonObj->order->products, $jsonObj->order->products),
		        'currency' => 'cad',
		        // 'receipt_email' => $jsonObj->order->receiptEmail,
		        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
		        'automatic_payment_methods' => [
		            'enabled' => true,
		        ],
		        'metadata' => [
		        	'order_id' => get_order_id($jsonObj->order->products),
		        	'customer_message' => $jsonObj->order->message,
		        	'products' => $jsonObj->order->products,
		        ],
		        // add this information when you decide to use a tracking number, meanwhile the shipping el fills this in
		        // 'shipping' => [
		        // 	'tracking_number' => 'todo',
		        //	'address' => [],
		        // ]
		    ]);

		    $output = [
		        'clientSecret' => $paymentIntent->client_secret,
		    ];

		    echo json_encode($output);
		} catch (Error $e) {
		    http_response_code(500);
		    echo json_encode(['error' => $e->getMessage()]);
		}
	}
}