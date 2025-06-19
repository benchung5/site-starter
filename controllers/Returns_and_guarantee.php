<?php
namespace Controllers;
use Lib\Controller;

class Returns_and_guarantee extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index($param = null) {
		$this->render('returns_and_guarantee', null, 'Returns and Guarantee - Nature With Us', '
			Our guarantee and return policy');
	}
}