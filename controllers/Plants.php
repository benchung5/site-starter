<?php
namespace Controllers;
use Lib\Controller;
use Lib\Utils;

class Plants extends Controller 
{
	public function __construct() 
	{
		$this->trees = $this->load_model('trees_model');

		parent::__construct();
	}

	public function index() 
	{
		$this->render('plants', null, 'Search Native & Medicinal Plants Of the North', 'native trees, shrubs, herbaceous plants, and sedges of Canada');

		$this->load_script('mainPlants.js');
	}

	public function view($category, $title)
	{
		$plant = $this->trees->get(['category' => $category, 'slug' => $title]);
		
		if ($plant) {
			$view_data = [];
			$view_data['tree'] = $plant;
			$this->render('view_plant', $view_data, $plant->common_name);
			$this->load_script('mainSourceProducts.js');
		} else {
			$this->render('404');
		}
	}
}