<?php
namespace Controllers;
use Lib\Controller;
use Lib\Utils;

class Filter_plants extends Controller 
{
	public function __construct() 
	{
		$this->trees = $this->load_model('trees_model');

		parent::__construct();
	}

	public function index() 
	{
		$this->render('filter_plants', null, 'Native Plants');
	}

	public function view($slug = null)
	{
		$view_data = [];

		if ($slug) {
			$plant = $this->trees->get(['slug' => $slug]);
			$view_data['tree'] = $plant;
		}

		$this->render('view_plant', $view_data, $view_data['tree']->common_name);
	}
}