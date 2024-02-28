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

		function calculateOrderAmount(array $products): int {
		    // Replace this constant with a calculation of the order's amount
		    // Calculate the order total on the server to prevent
		    // people from directly manipulating the amount on the client
		    return 1400;
		}

		header('Content-Type: application/json');

		try {
		    // retrieve JSON from POST body
		    $jsonStr = file_get_contents('php://input');
		    $jsonObj = json_decode($jsonStr);

		    // Create a PaymentIntent with amount and currency
		    $paymentIntent = $stripe->paymentIntents->create([
		        'amount' => calculateOrderAmount($jsonObj->order->products),
		        'currency' => 'cad',
		        // 'receipt_email' => $jsonObj->order->receiptEmail,
		        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
		        'automatic_payment_methods' => [
		            'enabled' => true,
		        ],
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