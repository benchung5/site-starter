<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;


class Order_product_tables extends Controller 
{
	public function __construct() 
	{
		$this->products = $this->load_model('products_model');

		parent::__construct();
	}

	public function index()
	{

	}

	public function all() 
	{
		$order_product_tables = [];

		$order_product_tables = [
			'product_id' => $this->products->get_all() ?: [],
		];

		Utils::json_respond(SUCCESS_RESPONSE, $order_product_tables);
	}
}