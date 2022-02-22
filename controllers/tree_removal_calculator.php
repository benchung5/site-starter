<?php
namespace Controllers;
use Lib\Controller;

class Tree_removal_calculator extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index() 
	{
		$this->render('tree_removal_calculator', null, 'Tree Removal Calculator - Nature With Us');
	}
}