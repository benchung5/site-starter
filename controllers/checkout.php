<?php
namespace Controllers;
use Lib\Controller;
use Lib\Utils;

class Checkout extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index() 
	{
		$script = array('<script src="https://js.stripe.com/v3/"></script>');
		$this->render('checkout', null, 'Checkout - Nature With Us', 'We sell native trees and shrubs of the Pacific North West. Wholesale and retail by appointment.', $script);

		$this->load_script('checkout.js', 'defer');
	}
}