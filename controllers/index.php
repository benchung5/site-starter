<?php
namespace Controllers;
use Lib\Controller;

class Index extends Controller 
{
	public function __construct() 
	{
		$this->load_script('controllers/login.js');
	}

	public function index($param = null) {
		//get data from db
		$model = $this->load_model('model_sample');
		
		//pass view data to view
		$this->render('index');
	}
}