<?php

use Lib\Model;
use Lib\Utils;

class Orders_model extends Model
{
	public function __construct() {
		parent::__construct();
	}

	public function add($data)
	{
		if (is_array($data)) {
			// $ins = ['article_id' => $article_id, $table_id_name => $id];
			// $this->db->table($join_table_name)->insert($ins);
			
			$this->db->table('orders')->insert($data);

			$new_order_id = $this->db->insertId();

			return $new_order_id;
		}

		return false;
	}

	public function get($opts = [])
	{
		$this->db->table('orders o')->select('*');

		if (isset($opts['id'])) {
			$this->db->where('o.id', '=', $opts['id']);
		}

		// if (isset($opts['category'])) {
		// 	// _category_slug and _category_id are not to be used in the result
		// 	// they're only named so they don't overwrite the tree id and slug in this same query
		// 	$this->db->innerJoin('trees_category tc', 'tc.id', 't.trees_category_id');
		// 	$this->db->select('t.*, tc.slug AS _category_slug, tc.id AS _category_id');
		// 	$this->db->where('tc.slug', '=' , $opts['category']);
		// }

		$result = $this->db->get();

		if ($result) {

			// // eco_benefits
			// $result->eco_benefits = $this->db->table('trees_eco_benefits te')
			// 	->select('e.id, e.name')
			// 	->where('te.tree_id', $result->id)
			// 	->innerJoin('eco_benefits e', 'e.id', 'te.eco_benefit_id')
			// 	->getAll();

			// // reproduction type
			// $result->reproduction_type = $this->db->table('reproduction_types rt')
			// 	->select('rt.id, rt.name')
			// 	->where('id', $result->reproduction_type_id)
			// 	->get();

			// // seeds
			// $result->seed_prod_count = $this->db->table('products p')
			// 	->where('source_id', $result->id)
			// 	->where('pt.name', 'Seeds')
			// 	->leftJoin('product_types pt', 'p.product_type_id', 'pt.id')
			// 	->count('p.id', 'seeds')
			// 	->getAll();

			$result->products = $this->db->table('products p')
				->innerJoin('orders_products op', 'p.id', 'op.product_id')
				->where('op.order_id', $result->id)
				->getAll();

			return $result;
		}

		return false;
	}

	public function count()
	{
		$result = $this->db->table('orders')->count('id', 'total_rows')->get();
		if ($result) {
			return (int)$result->total_rows;
		} 
		return false;
	}

	protected function insert_joins($order_id, $joins, $table_name, $table_id_name, $join_table_name) {
		if (isset($joins[$table_name])) {
			$ids = (! is_array($joins[$table_name])) ? explode(',', $joins[$table_name]) : $joins[$table_name];

			foreach ($ids as $id) {
				$ins = ['order_id' => $order_id, $table_id_name => $id];
				$this->db->table($join_table_name)->insert($ins);
			}
		}
	}

	public function update($opts = [])
	{
		$order_id = $this->db->table('orders')->where($opts['where'])->get()->id;

		// streight updates
		if (isset($opts['where']) && isset($opts['update'])) {
			$this->db->table('orders');
			$this->db->where($opts['where'])->update($opts['update']);
		}

		// many to many tables
		if (isset($opts['joins'])) {
			$joins = $opts['joins'];
			$this->update_joins($order_id, $joins, 'products', 'product_id', 'orders_products');
		}
	}

	protected function update_joins($id, $joins, $table_name, $table_id_name, $join_table_name) {
		if (isset($joins[$table_name])) {
			// clear existing associations
			$this->db->table($join_table_name)->where('order_id', $id)->delete();

			// insert new associations
			$associatons = is_array($joins[$table_name]) ? $joins[$table_name] : explode(',', $joins[$table_name]);
			foreach ($associatons as $associaton_id) {
				$this->db->table($join_table_name)->insert(['order_id' => $id, $table_id_name => $associaton_id]);
			}
		}
	}

	public function remove($opts = [])
	{
		if ($opts) {
			$this->db->table('orders');

			if (isset($opts['id'])) {
				$this->db->where('id', '=', $opts['id']);
			}

			$order = $this->db->get();

			$deleted_order_id = $order->id;

			$this->db->table('orders')->where('id', $deleted_order_id)->delete();

			// // remove joins
			// $this->db->table('trees_eco_benefits')->where('tree_id', $deleted_tree_id)->delete();
			// $this->db->table('trees_native_to')->where('tree_id', $deleted_tree_id)->delete();
			// $this->db->table('trees_shapes')->where('tree_id', $deleted_tree_id)->delete();

			return $deleted_order_id;
		}

		return false;
	}

	public function get_all($opts = [], $isCount = false) 
	{
		$this->db->table('orders o');


		// // only in category
		// if (isset($opts['trees_category'])) {
		// 	if (count($opts['trees_category']) > 0) {
		// 		$this->db->in('t.trees_category_id', $opts['trees_category']);
		// 	} else {
		// 		// force no results since trees_category is queried but no trees_category is selected
		// 		return [];
		// 	}
		// }

		// // only in zones
		// if (isset($opts['zones'])) {
		// 	if (count($opts['zones']) > 0) {
		// 		//$this->db->in('t.zone_id', $opts['zones']);
		// 		$this->db->where('t.zone_id', '>=', $opts['zones'][0]);
		// 	} else {
		// 		// force no results since zones is queried but no zones is selected
		// 		return [];
		// 	}
		// }

		// // only in native_to
		// if (isset($opts['native_to'])) {
		// 	if (count($opts['native_to']) > 0) {
		// 		$this->db
		// 			->innerJoin('trees_native_to _tnt', '_tnt.tree_id', 't.id')
		// 			->innerJoin('native_to nt', 'nt.id', '_tnt.native_to_id')
		// 			->in('nt.id', $opts['native_to']);
		// 	} else {
		// 		// force no results since native_to is queried but no native_to is selected
		// 		return [];
		// 	}
		// }

		// use search criteria
		if (isset($opts['like'])) {
			// //genus
			// $this->db			
			// 	->leftJoin('genuses g', 'g.id', 't.genus_id')
			// 	->groupBy('t.id');

			// foreach (explode(',', $opts['like']) AS $search_term) {
			// 	$this->db->grouped(function($q, $search_term) {
			// 		$q->like('t.common_name', '%'.$search_term.'%')
			// 		->orLike('t.other_common_names', '%'.$search_term.'%')
			// 		->orLike('t.specific_epithet', '%'.$search_term.'%')
			// 		->orLike('t.other_species', '%'.$search_term.'%')
			// 		->orLike('t.genus_id', '%g.id%');
			// 	}, $search_term);
			// }

			foreach (explode(',', $opts['like']) AS $search_term) {
				$this->db->like('o.id', '%'.$search_term.'%')
					->orLike('o.name', '%'.$search_term.'%');
			}
		}

		if ($isCount) {
			 $this->db->select('DISTINCT o.id');

			 $result = $this->db->getAll();

			return count($result);
		} else {
			if (isset($opts['select'])) {
				$this->db->select(implode(',', $opts['select']));
			} else {
				//$this->db->select('DISTINCT o.id, t.slug, t.common_name, t.trees_category_id');
				$this->db->select('DISTINCT *');
			}

			//offset and limit
			if (isset($opts['offset'])) {
				$this->db->limit($opts['offset'], $opts['limit']);
			}

			$result = $this->db->orderBy('created')->getAll();

			return $result;
		}
	}
}