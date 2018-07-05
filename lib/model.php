<?php
include_once('./lib/database.php');

class Model {
	public $db = null;

	public function __construct() {
		 $Db = new Db();
		 $this->db = $Db->connect();
	}
}