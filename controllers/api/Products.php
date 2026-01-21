<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;
use Lib\Upload;


class Products extends Controller 
{
	public function __construct() 
	{
		$this->products = $this->load_model('products_model');

		parent::__construct();
	}

	public function index()
	{

	}

	public function search()
	{
		$data = Utils::read_get();

		$opts = [];

		if(isset($data['source_id'])) { $opts['source_id'] = $data['source_id']; };
		if(isset($data['offset'])) { $opts['offset'] = $data['offset']; };
		if(isset($data['limit'])) { $opts['limit'] = $data['limit']; };

		$count = $this->products->get_all($opts, true);
		$products = $this->products->get_all($opts);

		$result = ['products' => $products, 'count' => $count, 'offset' => isset($data['offset']) ? (int)$data['offset'] : 0, 'limit' => isset($data['limit']) ? (int)$data['limit'] : 0];

		if ($result) {
			Utils::json_respond(SUCCESS_RESPONSE, $result);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, ['products' => []]);
		}		
	}

	public function single($id) 
	{
		$tree = $this->products->get(['id' => $id]);
		if ($tree) {
			Utils::json_respond(SUCCESS_RESPONSE, $tree);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}

	public function create()
	{
		//handle posted input
		$data = Utils::read_post();

		try {
			$new_product = $this->update_product($data, true);

			Utils::json_respond(SUCCESS_RESPONSE, $new_product);
		} catch (Exception $e) {
			Utils::json_respond('Could not create product', $e->getMessage());
		}
	}

	public function update() 
	{
		$data = Utils::read_post();

		try {
			$this->update_product($data, false);

			Utils::json_respond(SUCCESS_RESPONSE, $data);	
		} catch (Exception $e) {
			Utils::json_respond(JWT_PROCESSING_ERROR, $e->getMessage());
		}		
	}

	protected function update_product($data, $is_add) 
	{
		//'add' or 'update'
		//use isset version for optional fields
		$update_data = [
			'product_type_id' => $data['product_type_id'],
			'product_type_variation_id' => $data['product_type_variation_id'],
			'status_id' => $data['status_id'],
			'price' => $data['price'],
			'amount_available' => $data['amount_available'],
		];

		if (isset($data['images'])) { $update_data['images'] = $data['images']; }

		$joins_data = [
			'source_ids' => !empty($data['source_ids']) ? $data['source_ids'] : null,
		];

		if ($is_add) {
			$new_product_id = $this->products->add([
				'insert' => $update_data,
				'joins' => $joins_data,
			]);
			$updated_product = $this->products->get(['id' => $new_product_id]);
		} else {
			$this->products->update([
				'where' => ['id' => $data['id']], 
				'update' => $update_data,
				'joins' => $joins_data,
			]);

			$updated_product = $this->products->get(['id' => $data['id']]);
		}
		
		return $updated_product;
	}

	public function remove_source()
	{
		$data = Utils::json_read();

		$removed = $this->products->remove_source($data['product_id'], $data['source_id']);

		Utils::json_respond(SUCCESS_RESPONSE, $removed);
	}

	public function delete()
	{
		$data = Utils::json_read();

		// remove tree, associations, and files
		$id = $this->products->remove($data);

		Utils::json_respond(SUCCESS_RESPONSE, $id);
	}
}