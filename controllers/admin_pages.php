<?php
namespace Controllers;
use Lib\Controller as Controller;
include_once('./lib/controller.php');

class Admin_pages extends Controller 
{
	public function __construct() 
	{
	}

	public function index($param = null) {		
		$this->render('admin_pages');
	}
}