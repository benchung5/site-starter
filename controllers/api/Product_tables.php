<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;


class Product_tables extends Controller 
{
	protected $origins = null;

	public function __construct() 
	{
		$this->product_statuses = $this->load_model('product_statuses_model');
		$this->product_types = $this->load_model('product_types_model');
		$this->product_type_variations = $this->load_model('product_type_variations_model');
		$this->trees = $this->load_model('trees_model');

		parent::__construct();
	}

	public function index()
	{

	}

	public function all() 
	{
		$product_tables = [];

		$product_tables = [
			'status_id' => $this->product_statuses->get_all() ?: [],
			'product_type_id' => $this->product_types->get_all() ?: [],
			'product_type_variation_id' => $this->product_type_variations->get_all() ?: [],
			'source_ids' => $this->trees->get_all(['select' => ['t.id', 't.common_name AS name']]) ?: [],
		];

		Utils::json_respond(SUCCESS_RESPONSE, $product_tables);
	}
}