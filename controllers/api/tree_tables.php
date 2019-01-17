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
		$this->regions = $this->load_model('regions_model');
		$this->zones = $this->load_model('zones_model');
		$this->tree_categories = $this->load_model('trees_category_model');
		$this->genuses = $this->load_model('genuses_model');
		$this->tags = $this->load_model('tags_files_trees_model');
		$this->shapes = $this->load_model('shapes_model');
		$this->trunk_arrangements = $this->load_model('trunk_arrangements_model');
		$this->bark = $this->load_model('bark_model');
		$this->natural_habitat = $this->load_model('natural_habitat_model');

		parent::__construct();
	}

	public function index()
	{

	}

	public function all() 
	{
		$tree_tables = [];

		$tree_tables = [
			'origins' => $this->origins->get_all() ?: [],
			'regions' => $this->regions->get_all() ?: [],
			'zones' => $this->zones->get_all() ?: [],
			'trees_category' =>  $this->tree_categories->get_all() ?: [],
			'genuses' => $this->genuses->get_all() ?: [],
			'tags' => $this->tags->get_all() ?: [],
			'shapes' => $this->shapes->get_all() ?: [],
			'trunk_arrangements' => $this->trunk_arrangements->get_all() ?: [],
			'bark' => $this->bark->get_all() ?: [],
			'natural_habitat' => $this->natural_habitat->get_all() ?: []
		];

		Utils::json_respond(SUCCESS_RESPONSE, $tree_tables);
	}
}