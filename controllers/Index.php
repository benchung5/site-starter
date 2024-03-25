<?php
namespace Controllers;
use Lib\Controller;
use Lib\Validation\Validator;

class Index extends Controller 
{
	public function __construct() 
	{
		//$this->load_script('controllers/login.js');
	}

	public function index($param = null) 
	{
		// pass view data to view
		$this->render('index', null, 'Northern BC Native Tree Farm', 'Locally owned and operated native tree and shrub nursery. We grow coniferous and deciduous trees, shrubs, and woody plants native to the interior Pacific North West.');
	}
}