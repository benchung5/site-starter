<?php
namespace Controllers;
use Lib\Controller;

class Checkout_return extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index($param = null) {

		$this->render('checkout_return', null, 'Checkout Return - Nature With Us', 'We sell native trees and shrubs of the Pacific North West. Wholesale and retail by appointment.');

		$this->load_script('checkout.js', 'defer');
	}
}