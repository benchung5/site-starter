<?php
namespace Controllers;
use Lib\Controller;

class Contact extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index($param = null) {
		//get data from db
		$model = $this->load_model('model_sample');
		
		//pass view data to view
		$view_data = ['vehicles' => $model->get_vehicles()];
		$this->render('contact', $view_data );
	}
}