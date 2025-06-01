<?php
use Lib\Model;
use Lib\Utils;

class Orders_products_model extends Model
{
	// public function get_all($opts = [])
	// {
	// 	$this->db->table('products p');

	// 	// only in products that belong to the source
	// 	if (isset($opts['source_id'])) {
	// 		$this->db->where('p.source_id', '=', $opts['source_id']);
	// 	}

	// 	$this->db
	// 		->select('p.id, pt.name productTypeName, ptv.name productTypeVariationName, p.price, p.amount_available, ps.name status')
	// 		->leftJoin('product_types pt', 'p.product_type_id', 'pt.id')
	// 		->leftJoin('product_type_variations ptv', 'p.product_type_variation_id', 'ptv.id')
	// 		->leftJoin('product_statuses ps', 'p.status_id', 'ps.id');

	// 	$result = $this->db->getAll();

	// 	return $result;
	// }

	// public function get($opts = []) 
	// {
	// 	$this->db->table('products p');

	// 	if (isset($opts['id'])) {
	// 		$this->db->where('p.id', '=', $opts['id']);
	// 		$this->db->select('*');
	// 		$result = $this->db->get();
	// 	}

	// 	return $result;
	// }

	public function add($opts)
	{
		$this->db->table('orders_products')->insert($opts);
	}

	// public function update($opts = [])
	// {
	// 	$product_id = $this->db->table('products')->where($opts['where'])->get()->id;

	// 	// streight updates
	// 	if (isset($opts['where']) && isset($opts['update'])) {
	// 		$this->db->table('products');
	// 		$this->db->where($opts['where'])->update($opts['update']);
	// 	}

	// }

	public function remove($opts = [])
	{
		if ($opts) {
			$this->db->table('orders_products');

			if (isset($opts['order_id'])) {
				$this->db->table('products')->where('id', $opts['order_id'])->delete();
			}
		} else {
			return false;
		}
	}

}