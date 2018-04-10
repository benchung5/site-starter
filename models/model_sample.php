<?php
include_once('./lib/model.php');

class model_sample extends Model 
{
	// protected $data;
	// protected $inventory;

	public function __construct() {
		parent::__construct();
	}

	public function get_vehicles() {
		$data = $this->db->query("SELECT name FROM vehicles");
		return $data;
	}
}