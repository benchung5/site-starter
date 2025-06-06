<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;


class Order_tables extends Controller 
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
		$order_tables = [];

		$order_tables = [
			'products' => $this->products->get_all() ?: [],
		];

		Utils::json_respond(SUCCESS_RESPONSE, $order_tables);
	}
}