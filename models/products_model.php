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

		$this->db
			->select('p.id, pt.name productTypeName, ptv.name productTypeVariationName, p.price, p.amount_available')
			->leftJoin('product_types pt', 'p.product_type_id', 'pt.id')
			->leftJoin('product_type_variations ptv', 'p.product_type_variation_id', 'ptv.id');

		$result = $this->db->getAll();

		return $result;
	}
}