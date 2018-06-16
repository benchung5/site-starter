<?php
include_once('./lib/controller.php');

class Admin extends Controller 
{
	public function __construct() 
	{
	}

	public function index($param = null) {		
		$this->render('admin');
	}
}