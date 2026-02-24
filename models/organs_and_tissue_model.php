<?php

use Lib\Model;

class Organs_and_tissue_model extends Model
{
	public $options;

	public function __construct() 
	{
		parent::__construct();
	}

	public function get_all($opts = [])
	{
		$this->db->table('organs_and_tissue');
		
		if ($opts) {
			$this->db->select(implode(',', $opts));
		} else {
			$this->db->select('*');
		}

		$result = $this->db->getAll();
		return $result;
	}
}
