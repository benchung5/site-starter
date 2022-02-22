<?php
namespace Controllers;
use Lib\Controller;

class Services extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index() 
	{
		$this->render('services', null, 'Sevices - Nature With Us');
	}
}