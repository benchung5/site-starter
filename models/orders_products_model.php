<?php
use Lib\Model;
use Lib\Utils;

class Orders_products_model extends Model
{
	public function get_all($opts = [])
	{
		$this->db->table('orders_products op');

		// only in products that belong to the order
		if (isset($opts['order_id'])) {
			$this->db
				->where('op.order_id', '=', $opts['order_id'])
				->innerJoin('products p', 'p.id', 'op.product_id')
				->leftJoin('product_types pt', 'p.product_type_id', 'pt.id')
				->leftJoin('product_type_variations ptv', 'p.product_type_variation_id', 'ptv.id')
				->leftJoin('product_statuses ps', 'p.status_id', 'ps.id')
				->leftJoin('products_sources ps_src', 'ps_src.product_id', 'p.id')
				->leftJoin('trees t', 't.id', 'ps_src.source_id')
				->select('op.quantity, op.id, pt.name productTypeName, ptv.name productTypeVariationName, p.id product_id, p.price, p.amount_available, ps.name status, MIN(t.common_name) source_name')
				->groupBy('op.id');
		}

		$result = $this->db->getAll();

		//combine the "name"
		foreach ($result as $prod_result) {
			$name = $prod_result->source_name.' > '.$prod_result->productTypeName.' ('.$prod_result->productTypeVariationName.')';
			$prod_result->name = $name;
		}

		return $result;
	}

	public function get($opts = []) 
	{
		$this->db->table('orders_products op');

		if (isset($opts['id'])) {
			$this->db->where('op.id', '=', $opts['id']);
			$this->db->select('*');
			$result = $this->db->get();
		}

		return $result;
	}

	public function add($opts)
	{
		$result = $this->db->table('orders_products')->insert($opts);
		$new_orders_products_id = $this->db->insertId();
		return $new_orders_products_id;
	}

	public function update($opts = [])
	{
		// $order_id = $this->db->table('orders_products')->where($opts['where'])->get()->order_id;

		// streight updates
		if (isset($opts['where']) && isset($opts['update'])) {
			$this->db->table('orders_products');
			$this->db->where($opts['where'])->update($opts['update']);
		}

	}

	public function remove($opts = [])
	{
		if ($opts) {
			$this->db->table('orders_products');

			if (isset($opts['id'])) {
				$this->db->table('orders_products')
				->where('id', $opts['id'])
				->delete();
			}
			return $opts['id'];
		} else {
			return false;
		}
	}

}