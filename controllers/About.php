<?php
namespace Controllers;
use Lib\Controller;

class About extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index() 
	{
		$this->render('about', null, 'About our northern BC native tree farm', 'We sell native trees and shrubs of the Pacific North West. Wholesale and retail by appointment.');
	}
}