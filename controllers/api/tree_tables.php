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

		parent::__construct();
	}

	public function index()
	{

	}

	public function all() 
	{
		$tree_tables = [];

		$origins = $this->origins->get_all(['id', 'name']);
		$trees_category = $this->tree_categories->get_all(['id', 'name']);

		$tree_tables = [
			'origins' => $origins ?: [],
			'trees_category' => $trees_category ?: []
		];

		Utils::json_respond(SUCCESS_RESPONSE, $tree_tables);
	}
}