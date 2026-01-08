<?php
namespace Controllers;
use Lib\Controller;

class Privacy_policy extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index($param = null) {
		$this->render('privacy_policy', null, 'Privacy Policy - Nature With Us', 'Privacy Policy for Nature With Us. Learn how we collect, use, and protect your personal information.');
	}
}
