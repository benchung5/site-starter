<?php
namespace Controllers;
use Lib\Controller;
use Lib\Utils;

class Articles extends Controller 
{
	public function __construct() 
	{
		$this->articles = $this->load_model('articles_model');
		parent::__construct();
	}

	public function index() 
	{
		$this->render('articles', null, 'Articles', 'Search articles on northern native plants and wildfowers. Topics include medicinal plants, native plants, sustainable landscapes, and plant science.');

		$this->load_script('mainArticles.js');
	}

	public function view($category, $title)
	{
		$article = $this->articles->get(['category' => $category, 'slug' => $title]);

		if ($article) {
			$view_data = [];
			$view_data['article'] = $article;
			$this->render('view', $view_data, $article->name);
		} else {
			$this->render('404');
		}
	}
}