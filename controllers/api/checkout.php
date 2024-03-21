<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;
use Lib\Uri;
use Lib\Calc_payment;
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

		header('Content-Type: application/json');

		try {
		    // retrieve JSON from POST body
		    // $jsonStr = file_get_contents('php://input');
		    // $data = json_decode($jsonStr);
		    $data = Utils::json_read();

		    $subtotal = Calc_payment::calc_subtotal($data['order']);
		    
	    	// Create a PaymentIntent with amount and currency
	    	$paymentIntent = $stripe->paymentIntents->create([
	    	    'amount' => $subtotal,
	    	    'currency' => 'cad',
	    	    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
	    	    'automatic_payment_methods' => [
	    	        'enabled' => true,
	    	    ],
	    	    'metadata' => [],
	    	]);

	    	$output = [
	    	    'clientSecret' => $paymentIntent->client_secret,
	    	    'paymentIntentId' => $paymentIntent->id,
	    	];

	    	echo json_encode($output);

		} catch (Error $e) {
		    http_response_code(500);
		    echo json_encode(['error' => $e->getMessage()]);
		}
	}
}