<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;


class Tree_tables extends Controller 
{
	protected $origins = null;

	public function __construct() 
	{
		$this->origins = $this->load_model('origins_model');
		$this->tree_categories = $this->load_model('trees_category_model');
		$this->genuses = $this->load_model('genuses_model');
		$this->tags = $this->load_model('tags_files_trees_model');

		parent::__construct();
	}

	public function index()
	{

	}

	public function all() 
	{
		$tree_tables = [];

		$origins = $this->origins->get_all();
		$trees_category = $this->tree_categories->get_all();
		$genuses = $this->genuses->get_all();
		$tags = $this->tags->get_all();

		$tree_tables = [
			'origins' => $origins ?: [],
			'trees_category' => $trees_category ?: [],
			'genuses' => $genuses ?: [],
			'tags' => $tags ?: []
		];

		Utils::json_respond(SUCCESS_RESPONSE, $tree_tables);
	}
}