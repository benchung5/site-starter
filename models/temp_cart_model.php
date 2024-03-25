<?php

use Lib\Model;
use Lib\Utils;

class Temp_cart_model extends Model
{
	public function __construct() {
		parent::__construct();
	}

	public function get_products($payment_intent_id)
	{
		$this->db->table('temp_cart')->select('products');
		$this->db->where('payment_intent_id', '=', $payment_intent_id);
		$result = $this->db->get();
		
		return $result;
	}

	public function remove($payment_intent_id)
	{
		$this->db->table('temp_cart');
		$this->db->where('payment_intent_id', '=', $payment_intent_id);
		$this->db->delete();
	}

	public function add($data)
	{
		if (is_array($data)) {
			// $data = ['payment_intent_id' => ..., 'products' => ...];
			
			$this->db->table('temp_cart')->insert($data);
		}

		return false;
	}
}