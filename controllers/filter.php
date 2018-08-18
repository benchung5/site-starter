<?php
namespace Controllers;
use Lib\Controller;
use Lib\Utils;

class Filter extends Controller 
{
	public function __construct() 
	{
		$this->articles = $this->load_model('articles_model');

		parent::__construct();
	}

	public function index() 
	{
		$this->render('filter');
	}

	public function view($slug = null)
	{
		$view_data = [];

		if ($slug) {
			$article = $this->articles->get(['slug' => $slug]);
			$view_data['article'] = $article;
		}

		$this->render('view', $view_data );
	}
}