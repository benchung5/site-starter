<?php

use Lib\Model;
use Lib\Utils;

class Mode_model extends Model
{
	public $options;

	public function __construct() {
		parent::__construct();

		// $this->mode = [
		// 	(object)['id' => 'draft', 'name' => 'draft'],
		// 	(object)['id' => 'live', 'name' => 'live']
		// ];
	}

	public function get_all($opts = []) 
	{
		$this->db->table('mode');
		$result = $this->db->getAll();
		return $result;
	}
}