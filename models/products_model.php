<?php
use Lib\Model;
use Lib\Utils;

class Products_model extends Model
{
	public function get_all($opts = [])
	{
		$this->db->table('products p');

		// only in products that belong to the source
		if (isset($opts['source_id'])) {
			$this->db->where('p.source_id', '=', $opts['source_id']);
		}

		// only in products of certain variation
		if (isset($opts['status_id'])) {
			$this->db->where('p.status_id', '=', $opts['status_id']);
		}

		if (isset($opts['select'])) {
			$this->db->select($opts['select']);
		} else {
			$this->db->select('p.id, pt.name productTypeName, ptv.name productTypeVariationName, p.price, p.amount_available, ps.name status, t.common_name source_name, CONCAT_WS(" - ",t.common_name, pt.name, ptv.name) name');
		}

		$this->db
			->leftJoin('product_types pt', 'p.product_type_id', 'pt.id')
			->leftJoin('product_type_variations ptv', 'p.product_type_variation_id', 'ptv.id')
			->leftJoin('product_statuses ps', 'p.status_id', 'ps.id')
			->leftJoin('trees t', 't.id', 'p.source_id')
			->orderBy('name');

		$result = $this->db->getAll();

		// //combine the "name"
		// foreach ($result as $prod_result) {
		// 	$name = $prod_result->source_name.' > '.$prod_result->productTypeName.' ('.$prod_result->productTypeVariationName.')';
		// 	$prod_result->name = $name;
		// }

		return $result;
	}

	public function get($opts = []) 
	{
		$this->db->table('products p');

		if (isset($opts['id'])) {
			$this->db->where('p.id', '=', $opts['id']);
			$this->db->select('*');
			$result = $this->db->get();

			return $result;
		} else {
			return false;
		}

		
	}

	public function add($opts)
	{
		$this->db->table('products')->insert($opts);
		$new_product_id = $this->db->insertId();

		// // many to many tables
		// if (isset($opts['joins'])) {
		// 	$joins = $opts['joins'];
		// 	$this->insert_joins($new_product_id, $joins, 'eco_benefits', 'eco_benefit_id', 'trees_eco_benefits');
		// 	$this->insert_joins($new_product_id, $joins, 'native_to', 'native_to_id', 'trees_native_to');
		// 	$this->insert_joins($new_product_id, $joins, 'shapes', 'shape_id', 'trees_shapes');
		// 	$this->insert_joins($new_product_id, $joins, 'light', 'light_id', 'trees_light');
		// 	$this->insert_joins($new_product_id, $joins, 'soil', 'soil_id', 'trees_soil');
		// 	$this->insert_joins($new_product_id, $joins, 'natural_habitat', 'natural_habitat_id', 'trees_natural_habitat');
		// 	$this->insert_joins($new_product_id, $joins, 'common_uses', 'common_use_id', 'trees_common_uses');
		// 	$this->insert_joins($new_product_id, $joins, 'transplanting', 'transplanting_id', 'trees_transplanting');
		// 	$this->insert_joins($new_product_id, $joins, 'unique_attractions', 'unique_attraction_id', 'trees_unique_attractions');
		// 	$this->insert_joins($new_product_id, $joins, 'tolerances', 'tolerance_id', 'trees_tolerances');
		// 	// $this->insert_joins($new_product_id, $joins, 'insects', 'insects_id', 'trees_insects');
		// 	// $this->insert_joins($new_product_id, $joins, 'diseases', 'disease_id', 'trees_diseases');
		// }

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

		// // many to many tables
		// if (isset($opts['joins'])) {
		// 	$joins = $opts['joins'];
		// 	$this->update_joins($product_id, $joins, 'eco_benefits', 'eco_benefit_id', 'trees_eco_benefits');
		// 	$this->update_joins($product_id, $joins, 'native_to', 'native_to_id', 'trees_native_to');
		// 	$this->update_joins($product_id, $joins, 'shapes', 'shape_id', 'trees_shapes');
		// 	$this->update_joins($product_id, $joins, 'light', 'light_id', 'trees_light');
		// 	$this->update_joins($product_id, $joins, 'soil', 'soil_id', 'trees_soil');
		// 	$this->update_joins($product_id, $joins, 'natural_habitat', 'natural_habitat_id', 'trees_natural_habitat');
		// 	$this->update_joins($product_id, $joins, 'common_uses', 'common_use_id', 'trees_common_uses');
		// 	$this->update_joins($product_id, $joins, 'transplanting', 'transplanting_id', 'trees_transplanting');
		// 	$this->update_joins($product_id, $joins, 'unique_attractions', 'unique_attraction_id', 'trees_unique_attractions');
		// 	$this->update_joins($product_id, $joins, 'tolerances', 'tolerance_id', 'trees_tolerances');
		// 	// $this->update_joins($product_id, $joins, 'insects', 'insects_id', 'trees_insects');
		// 	// $this->update_joins($product_id, $joins, 'diseases', 'disease_id', 'trees_diseases');
		// }
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

			// // remove joins
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

}