<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;


class Orders extends Controller 
{
	protected $orders = null;

	public function __construct() 
	{
		$this->orders = $this->load_model('orders_model');

		parent::__construct();
	}

	public function index()
	{

	}

	public function create()
	{
		//handle posted input
		$data = Utils::read_post();

		try {
			$new_order = $this->update_order($data, true);

			Utils::json_respond(SUCCESS_RESPONSE, $new_order);
		} catch (Exception $e) {
			Utils::json_respond('Could not create order', $e->getMessage());
		}
	}

	public function update() 
	{
		$data = Utils::read_post();

		try {
			$this->update_order($data, false);

			Utils::json_respond(SUCCESS_RESPONSE, $data);	
		} catch (Exception $e) {
			Utils::json_respond(JWT_PROCESSING_ERROR, $e->getMessage());
		}		
	}

	protected function update_order($data, $is_add) 
	{
		// $this->validator->addEntries(['slug' => $data['slug']]);
		// $this->validator->addRule('slug', 'Must be a valid slug', 'slug');
		// $this->validator->validate();

		// if ($this->validator->foundErrors()) {
		//     $errors = $this->validator->getErrors();
		//     Utils::json_respond(VALIDATE_PARAMETER_DATATYPE, implode(', ', $errors));
		// }

		//'add' or 'update'
		//use isset version for optional fields
		$update_data = [
			// 'amount' => $data['amount'],
			// 'amount_received' => $data['amount_received'],
			// 'subtotal' => $data['subtotal'],
			// 'tax' => $data['tax'],
			// 'shipping' => $data['shipping'],
			// 'description' => $data['description'],
			// 'email' => $data['email'],
			// 'name' => $data['name'],
			// 'phone' => $data['phone'],
			// 'city' => $data['city'],
			// 'line1' => $data['line1'],
			// 'line2' => $data['line2'],
			// 'postal_code' => $data['postal_code'],
			// 'state' => $data['state'],
			// 'created' => $data['created'],
			// 'canceled_at' => $data['canceled_at'],
			// 'cancellation_reason' => $data['cancellation_reason'],
			'shipped' => $data['shipped']
		];

		if(!empty($data['payment_intent_id'])) { $update_data['payment_intent_id'] = $data['payment_intent_id']; };
		if(!empty($data['amount'])) { $update_data['amount'] = $data['amount']; };
		if(!empty($data['amount_received'])) { $update_data['amount_received'] = $data['amount_received']; };
		if(!empty($data['subtotal'])) { $update_data['subtotal'] = $data['subtotal']; };
		if(!empty($data['tax'])) { $update_data['tax'] = $data['tax']; };
		if(!empty($data['shipping'])) { $update_data['shipping'] = $data['shipping']; };
		if(isset($data['description'])) { $update_data['description'] = $data['description']; };
		if(isset($data['email'])) { $update_data['email'] = $data['email']; };
		if(isset($data['name'])) { $update_data['name'] = $data['name']; };
		if(isset($data['phone'])) { $update_data['phone'] = $data['phone']; };
		if(isset($data['city'])) { $update_data['city'] = $data['city']; };
		if(isset($data['line1'])) { $update_data['line1'] = $data['line1']; };
		if(isset($data['line2'])) { $update_data['line2'] = $data['line2']; };
		if(isset($data['postal_code'])) { $update_data['postal_code'] = $data['postal_code']; };
		if(isset($data['state'])) { $update_data['state'] = $data['state']; };
		if(!empty($data['created'])) { $update_data['created'] = $data['created']; };
		if(!empty($data['canceled_at'])) { $update_data['canceled_at'] = $data['canceled_at']; };
		if(isset($data['cancellation_reason'])) { $update_data['cancellation_reason'] = $data['cancellation_reason']; };
		// if(isset($data['shipped'])) { $update_data['shipped'] = $data['shipped']; };
	

		// the many to many table data...
		$joins_data = [
			'products' => !empty($data['products']) ? $data['products'] : null,
			// 	'native_to' => !empty($data['native_to']) ? $data['native_to'] : null,
			// 	'shapes' => !empty($data['shapes']) ? $data['shapes'] : null,
		];

		if ($is_add) {
			$insert_data = [
				'insert' => $update_data,
				'joins' => $joins_data
			];

			$new_order_id = $this->orders->add($insert_data);
			$updated_order = $this->orders->get(['id' => $new_order_id]);
		} else {
			$this->orders->update([
				'where' => ['id' => $data['order_id']], 
				'update' => $update_data,
				'joins' => $joins_data
			]);

			$updated_order = $this->orders->get(['id' => $data['order_id']]);
		}

		$this->orders->update([
			'where' => ['id' => $updated_order->id], 
		]);
		
		return $updated_order;
	}

	public function delete()
	{
		$data = Utils::json_read();

		// remove order, associations, and files
		$id = $this->orders->remove($data);

		Utils::json_respond(SUCCESS_RESPONSE, $id);
	}

	public function all() 
	{
		$orders = $this->orders->get_all();
		if ($orders) {
			Utils::json_respond(SUCCESS_RESPONSE, $orders);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}

	public function single($id) 
	{
		$order = $this->orders->get(['id' => $id]);
		if ($order) {
			Utils::json_respond(SUCCESS_RESPONSE, $order);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}

	public function search()
	{
		$data = Utils::read_get();

		$opts = [
			'offset' => $data['offset'], 
			'limit' => $data['limit'],
			'like' => isset($data['search']) ? $data['search'] : null, 
			// 'trees_category' => isset($data['trees_category_id']) ? $data['trees_category_id'] : null, 
			// 'native_to' => isset($data['native_to']) ? $data['native_to'] : null,
			// 'mode' => isset($data['mode']) ? $data['mode'] : null,
			//'select' => ['o.id', 'o.slug'],
			'select' => ['*'],
		];

		//just to count the results *without the offset and limit
		$count = $this->orders->get_all($opts, true);

		$orders = $this->orders->get_all($opts);

		$result = ['orders' => $orders, 'count' => $count, 'offset' => (int)$data['offset'], 'limit' => (int)$data['limit']];

		if ($orders) {
			Utils::json_respond(SUCCESS_RESPONSE, $result);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, ['orders' => [], 'count' => 0, 'offset' => 0, 'limit' => (int)$data['limit']]);
		}		
	}
}