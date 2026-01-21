<?php
use Lib\Model;
use Lib\Utils;

class Products_model extends Model
{
	public function get_all($opts = [], $isCount = false)
	{
		$this->db->table('products p');

		// only in products that belong to the source
		if (isset($opts['source_id'])) {
			$this->db
				->innerJoin('products_sources ps_filter', 'ps_filter.product_id', 'p.id')
				->where('ps_filter.source_id', '=', $opts['source_id']);
		}

		// only in products of certain variation
		if (isset($opts['status_id'])) {
			$this->db->where('p.status_id', '=', $opts['status_id']);
		}

		$this->db
			->leftJoin('product_types pt', 'p.product_type_id', 'pt.id')
			->leftJoin('product_type_variations ptv', 'p.product_type_variation_id', 'ptv.id')
			->leftJoin('product_statuses ps', 'p.status_id', 'ps.id')
			->leftJoin('products_sources ps_src', 'ps_src.product_id', 'p.id')
			->leftJoin('trees t', 't.id', 'ps_src.source_id')
			->groupBy('p.id');

		if ($isCount) {
			$this->db->select('DISTINCT p.id');
			$result = $this->db->getAll();
			return count($result);
		}

		if (isset($opts['select'])) {
			$this->db->select($opts['select']);
		} else {
			$this->db->select('p.id, pt.name productTypeName, ptv.name productTypeVariationName, p.price, p.amount_available, ps.name status, MIN(t.common_name) source_name, GROUP_CONCAT(DISTINCT t.common_name ORDER BY t.common_name SEPARATOR ", ") source_names, p.images, CONCAT_WS(" - ", MIN(t.common_name), pt.name, ptv.name) name');
		}

		if (isset($opts['offset'])) {
			$this->db->limit($opts['offset'], $opts['limit']);
		}

		$this->db->orderBy('name');

		$result = $this->db->getAll();

		// //combine the "name"
		// foreach ($result as $prod_result) {
		// 	$name = $prod_result->source_name.' > '.$prod_result->productTypeName.' ('.$prod_result->productTypeVariationName.')';
		// 	$prod_result->name = $name;
		// }

		if ($result) {
			foreach ($result as $product) {
				$product->images = Json_decode($product->images) ?: [];
			}
		}

		return $result ?: [];
	}

	public function get($opts = []) 
	{
		$this->db->table('products p');

		if (isset($opts['id'])) {
			$this->db->where('p.id', '=', $opts['id']);
			$this->db->select('*');
			$result = $this->db->get();

			if ($result) {
				$result->images = Json_decode($result->images) ?: [];
				$result->sources = $this->db->table('trees t')
					->select('t.id, t.common_name AS name, t.slug')
					->innerJoin('products_sources ps', 'ps.source_id', 't.id')
					->where('ps.product_id', $result->id)
					->orderBy('t.common_name')
					->getAll();
			}

			return $result;
		} else {
			return false;
		}

		
	}

	public function add($opts)
	{
		$insert_data = isset($opts['insert']) ? $opts['insert'] : $opts;
		$this->db->table('products')->insert($insert_data);
		$new_product_id = $this->db->insertId();

		// many to many tables
		if (isset($opts['joins'])) {
			$joins = $opts['joins'];
			$this->insert_joins($new_product_id, $joins, 'source_ids', 'source_id', 'products_sources');
		}

		return $new_product_id;
	}

	public function update($opts = [])
	{
		$product_id = $this->db->table('products')->where($opts['where'])->get()->id;

		// streight updates
		if (isset($opts['where']) && isset($opts['update'])) {
			$this->db->table('products');
			$this->db->where($opts['where'])->update($opts['update']);
		}

		// many to many tables
		if (isset($opts['joins'])) {
			$joins = $opts['joins'];
			$this->update_joins($product_id, $joins, 'source_ids', 'source_id', 'products_sources');
		}
	}

	protected function insert_joins($product_id, $joins, $table_name, $table_id_name, $join_table_name) {
		if (isset($joins[$table_name])) {
			$ids = (! is_array($joins[$table_name])) ? explode(',', $joins[$table_name]) : $joins[$table_name];

			foreach ($ids as $id) {
				if ($id === '' || $id === null) {
					continue;
				}
				$ins = ['product_id' => $product_id, $table_id_name => $id];
				$this->db->table($join_table_name)->insert($ins);
			}
		}
	}

	protected function update_joins($id, $joins, $table_name, $table_id_name, $join_table_name) {
		if (isset($joins[$table_name])) {
			// clear existing associations
			$this->db->table($join_table_name)->where('product_id', $id)->delete();

			// insert new associations
			$associatons = is_array($joins[$table_name]) ? $joins[$table_name] : explode(',', $joins[$table_name]);
			foreach ($associatons as $associaton_id) {
				if ($associaton_id === '' || $associaton_id === null) {
					continue;
				}
				$this->db->table($join_table_name)->insert(['product_id' => $id, $table_id_name => $associaton_id]);
			}
		}
	}

	public function remove($opts = [])
	{
		if ($opts) {
			$this->db->table('products');

			if (isset($opts['id'])) {
				$this->db->where('id', '=', $opts['id']);
			}

			$product = $this->db->get();

			$deleted_product_id = $product->id;

			$this->db->table('products')->where('id', $deleted_product_id)->delete();

			// remove joins
			$this->db->table('products_sources')->where('product_id', $deleted_product_id)->delete();
			// $this->db->table('trees_eco_benefits')->where('tree_id', $deleted_product_id)->delete();
			// $this->db->table('trees_native_to')->where('tree_id', $deleted_product_id)->delete();
			// $this->db->table('trees_shapes')->where('tree_id', $deleted_product_id)->delete();
			// $this->db->table('trees_light')->where('tree_id', $deleted_product_id)->delete();
			// $this->db->table('trees_soil')->where('tree_id', $deleted_product_id)->delete();
			// $this->db->table('trees_natural_habitat')->where('tree_id', $deleted_product_id)->delete();
			// $this->db->table('trees_common_uses')->where('tree_id', $deleted_product_id)->delete();
			// $this->db->table('trees_transplanting')->where('tree_id', $deleted_product_id)->delete();
			// $this->db->table('trees_tolerances')->where('tree_id', $deleted_product_id)->delete();
			// // $this->db->table('trees_insects')->where('tree_id', $deleted_product_id)->delete();
			// // $this->db->table('trees_diseases')->where('tree_id', $deleted_product_id)->delete();

			return $deleted_product_id;
		}

		return false;
	}

	public function remove_source($product_id, $source_id)
	{
		if ($product_id && $source_id) {
			$this->db->table('products_sources')
				->where('product_id', $product_id)
				->where('source_id', $source_id)
				->delete();
			return true;
		}

		return false;
	}

}