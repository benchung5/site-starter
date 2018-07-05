<?php
namespace Lib;
use Lib\Db;

class Model {
	public $db = null;

	public function __construct() {
		 $Db = new Db();
		 $this->db = $Db->connect();
	}
}