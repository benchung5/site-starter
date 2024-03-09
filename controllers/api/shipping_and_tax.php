<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;


class Shipping_and_tax extends Controller 
{
	public function __construct() 
	{
		$this->products = $this->load_model('products_model');

		parent::__construct();
	}

	public function index()
	{
		$data = Utils::json_read();
		Utils::dbug($data);

		// calc shipping
		$seeds = [];
		$plants = [];
		$shipping_cost = 0.00;
		if ($data['order']['pickup'] !== 'yes') {

			foreach ($data['order']['products'] as $product) {
				// calc shipping
				if ($product['productTypeName'] == 'Seeds') {
					$seeds[] = $product;
				}
				if ($product['productTypeName'] == 'Plants') {
					$plants[] = $product;
				}
			}

			$seeds_count = count($seeds);
			$plants_count = count($plants);

			if ($seeds_count >= 1 && $seeds_count <= 5) {
				$shipping_cost = 1.25;
			} elseif ($seeds_count >= 6 && $seeds_count <= 20) {
				$shipping_cost = 5.00;
			}
		}


		// calc tax
		// Alberta: 5% GST, BC: 7% PST + 5% GST
		$total = 0.00;
		$tax = 0.00;
		foreach ($data['order']['products'] as $product) {
			$subtotal = $product['price'] * $product['quantity'];
			$total = $subtotal + $total;
		}

		if ($data['order']['address']['state'] == 'BC') {
			$tax = $total * 0.12;
		}

		if ($data['order']['address']['state'] == 'AB') {
			$tax = $total * 0.05;
		}

		$result = (object) [
			'shipping' => $shipping_cost,
			'tax' => $tax,
		];

		Utils::json_respond(SUCCESS_RESPONSE, $result);
		
	
		// $opts = [];

		// if(isset($data['source_id'])) { $opts['source_id'] = $data['source_id']; };

		// $products = $this->products->get_all($opts);

		// $result = ['products' => $products];

		// if ($result) {
		// 	Utils::json_respond(SUCCESS_RESPONSE, $result);
		// } else {
		// 	Utils::json_respond(SUCCESS_RESPONSE, ['products' => []]);
		// }		
		
	}

}