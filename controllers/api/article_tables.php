<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;


class Article_tables extends Controller 
{
	public function __construct() 
	{
		$this->categories = $this->load_model('categories_model');
		$this->tags = $this->load_model('tags_files_articles_model');
		$this->mode = $this->load_model('mode_model');

		parent::__construct();
	}

	public function index()
	{

	}

	public function all() 
	{
		$article_tables = [];

		$article_tables = [
			'categories' =>  $this->categories->get_all() ?: [],
			'tags' => $this->tags->get_all() ?: [],
			'mode_id' => $this->mode->get_all() ?: [],
		];

		Utils::json_respond(SUCCESS_RESPONSE, $article_tables);
	}
}