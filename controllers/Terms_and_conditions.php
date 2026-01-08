<?php
namespace Controllers;
use Lib\Controller;

class Terms_and_conditions extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index($param = null) {
		$this->render('terms_and_conditions', null, 'Terms and Conditions - Nature With Us', 'Terms and Conditions for Nature With Us. Please read our terms of use and conditions for using our website and purchasing our products.');
	}
}
