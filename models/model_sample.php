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
		//$data = $this->db->query("SELECT name FROM vehicles");

		$data = $this->db->table('vehicles')
		             ->select('name')
		             // ->where('age', '>', 18)
		             // ->orderBy('id', 'desc')
		             // ->limit(20)
		             ->getAll();

		return $data;
	}
}