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
		$this->render('plants', null, 'Northern Medicinal Plant Guide - Zone 4 & Cold-Hardy Herbs', 'Explore medicinal plants that thrive in northern climates. Find plant guides, care tips, and traditional uses for cold-hardy herbs.');

		$this->load_script('mainPlants.js');
	}

	public function view($category, $title)
	{
		$plant = $this->trees->get(['category' => $category, 'slug' => $title]);
		
		if ($plant) {
			$view_data = [];
			$view_data['tree'] = $plant;
			$title = $plant->common_name . ' – Grow & Use in Northern Gardens';
			$description = 'Learn how to grow and use ' . $plant->common_name . ' in northern climates. Find plant guides, care tips, and traditional uses for cold-hardy herbs.';
			$this->render('view_plant', $view_data, $title, $description);
			$this->load_script('mainSourceProducts.js');
		} else {
			$this->render('404');
		}
	}
}