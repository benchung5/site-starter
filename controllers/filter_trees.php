<?php
namespace Controllers;
use Lib\Controller;
use Lib\Utils;

class Filter_trees extends Controller 
{
	public function __construct() 
	{
		$this->trees = $this->load_model('trees_model');

		parent::__construct();
	}

	public function index() 
	{
		$this->render('filter_trees');
	}

	public function view($slug = null)
	{
		$view_data = [];

		if ($slug) {
			$tree = $this->trees->get(['slug' => $slug]);
			$view_data['tree'] = $tree;
		}

		$this->render('view_tree', $view_data );
	}
}