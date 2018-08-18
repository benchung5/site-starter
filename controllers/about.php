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
		//get data from db
		$model = $this->load_model('model_sample');
		
		//pass view data to view
		$view_data = ['vehicles' => $model->get_vehicles()];
		$this->render('about', $view_data );
	}
}