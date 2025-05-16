<?php

use Lib\Model;
use Lib\Utils;

class Product_statuses_model extends Model
{
	public $options;

	public function __construct() {
		parent::__construct();
	}

	public function get_all($opts = []) 
	{
		$this->db->table('product_statuses');

		if ($opts) {
			$this->db->select(implode(',', $opts));
		} else {
			$this->db->select('*');
		}

		$result = $this->db->getAll();
		return $result;
	}
}