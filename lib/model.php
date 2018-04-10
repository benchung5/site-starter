<?php
include_once('./lib/database.php');

class Model {
	public $db = null;

	public function __construct() {
		$this->db = new Db();
	}
}