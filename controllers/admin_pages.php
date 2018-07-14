<?php
namespace Controllers;
use Lib\Controller;

class Admin_pages extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index($param = null) {		
		$this->render('admin_pages');
	}
}