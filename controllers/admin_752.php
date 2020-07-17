<?php
namespace Controllers;
use Lib\Controller;
use Config\Config as Config;

class Admin_752 extends Controller 
{
	public function __construct()
	{
		parent::__construct();
	}

	public function index($param = null) 
	{
		$this->render(('admin_'.Config::paths('ADMIN_ID')), null, 'Admin');
	}
}