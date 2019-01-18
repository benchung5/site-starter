<?php

use Lib\Model;

class Wood_uses_model extends Model
{
	public $options;

	public function __construct() 
	{
		parent::__construct();
	}

	public function get_all($opts = []) 
	{
		$this->db->table('wood_uses');
		
		if ($opts) {
			$this->db->select(implode(',', $opts));
		} else {
			$this->db->select('*');
		}

		$result = $this->db->getAll();
		return $result;
	}
}