<?php
include_once('./lib/controller.php');
include_once('./models/model_sample.php');

class About_us extends Controller 
{
	public function __construct() 
	{
	}

	public function index($param = null) {
		//get data from db
		$model = $this->load_model('model_sample');
		
		//pass view data to view
		$view_data = ['vehicles'=>$model->get_vehicles()];
		$this->render('about_us', $view_data );
	}
}