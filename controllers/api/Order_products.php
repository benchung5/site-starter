<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;
use Lib\Upload;


class Order_products extends Controller 
{
	public function __construct() 
	{
		$this->orders_products = $this->load_model('orders_products_model');

		parent::__construct();
	}

	public function index()
	{

	}

	public function search()
	{
		$data = Utils::read_get();

		$opts = [];

		if(isset($data['order_id'])) { $opts['order_id'] = $data['order_id']; };

		$orders_products = $this->orders_products->get_all($opts);

		$result = ['products' => $orders_products];

		if ($result) {
			Utils::json_respond(SUCCESS_RESPONSE, $result);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, ['products' => []]);
		}		
	}

	public function single($id)
	{
		$product = $this->orders_products->get(['id' => $id]);
		if ($product) {
			Utils::json_respond(SUCCESS_RESPONSE, $product);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}

	public function create()
	{
		//handle posted input
		$data = Utils::read_post();

		try {
			$new_order_product = $this->update_order_product($data, true);

			Utils::json_respond(SUCCESS_RESPONSE, $new_order_product);
		} catch (Exception $e) {
			Utils::json_respond('Could not create product', $e->getMessage());
		}
	}

	public function update() 
	{
		$data = Utils::read_post();

		try {
			$this->update_order_product($data, false);

			Utils::json_respond(SUCCESS_RESPONSE, $data);	
		} catch (Exception $e) {
			Utils::json_respond(JWT_PROCESSING_ERROR, $e->getMessage());
		}		
	}

	protected function update_order_product($data, $is_add) 
	{
		//'add' or 'update'
		//use isset version for optional fields
		$update_data = [
			'quantity' => $data['quantity'],
		];

		if ($is_add) {
			$update_data['order_id'] = $data['order_id'];
			$update_data['product_id'] = $data['product_id'];
			$update_data['quantity'] = $data['quantity'];
			$new_order_product_id = $this->orders_products->add($update_data);
			$updated_order_product = $this->orders_products->get(['id' => $new_order_product_id]);
		} else {
			$updated_order_product_id = $this->orders_products->update([
				'where' => ['id' => $data['id']], 
				'update' => $update_data,
			]);

			// $updated_order_product = $this->orders_products->get(['id' => $data['id']]);
		}
		
		return $updated_order_product;
	}

	public function delete()
	{
		$data = Utils::json_read();

		// remove tree, associations, and files
		$id = $this->orders_products->remove($data);

		Utils::json_respond(SUCCESS_RESPONSE, $id);
	}
}