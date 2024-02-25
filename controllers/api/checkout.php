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
		header('Content-Type: application/json');

		$DOMAIN = Uri::get_current_domain();

		$checkout_session = $stripe->checkout->sessions->create([
		  'ui_mode' => 'embedded',
		  'shipping_address_collection' => ['allowed_countries' => ['CA']],
		  'shipping_options' => [
		    // [
		    //   'shipping_rate_data' => [
		    //     'type' => 'fixed_amount',
		    //     'fixed_amount' => [
		    //       'amount' => 0,
		    //       'currency' => 'usd',
		    //     ],
		    //     'display_name' => 'Free shipping',
		    //     'delivery_estimate' => [
		    //       'minimum' => [
		    //         'unit' => 'business_day',
		    //         'value' => 5,
		    //       ],
		    //       'maximum' => [
		    //         'unit' => 'business_day',
		    //         'value' => 7,
		    //       ],
		    //     ],
		    //   ],
		    // ],
		    [
		      'shipping_rate_data' => [
		        'type' => 'fixed_amount',
		        'fixed_amount' => [
		          'amount' => 2500,
		          'currency' => 'cad',
		        ],
		        'display_name' => 'Next day air',
		        'delivery_estimate' => [
		          'minimum' => [
		            'unit' => 'business_day',
		            'value' => 3,
		          ],
		          'maximum' => [
		            'unit' => 'business_day',
		            'value' => 5,
		          ],
		        ],
		      ],
		    ],
		  ],
		  'line_items' => [[
		  	'price_data' => [
		  	  'currency' => 'cad',
		  	  'unit_amount' => 2000,
		  	  'product_data' => [
		  	    'name' => 'T-shirt',
		  	    'description' => 'Comfortable cotton t-shirt',
		  	    'images' => [$DOMAIN . '/uploads/trees/1024px-Platanus_occidentalis_12zz-315-sml.jpg'],
		  	  ],
		  	],
		  	'quantity' => 1,
		  ]],
		  'mode' => 'payment',
		  'return_url' => $DOMAIN . '/checkout_return?session_id={CHECKOUT_SESSION_ID}',
		]);
		

		echo json_encode(array('clientSecret' => $checkout_session->client_secret));

	}
}