<?php

use Lib\Model;

class Users_model extends Model
{
	public function __construct() {
		parent::__construct();
	}

	public function get_user($opts = []) {

		$this->db->table('users')->select('*');

		if (isset($opts['user_id'])) {
			$this->db->where('user_id', '=', $opts['user_id']);
		}

		if (isset($opts['email'])) {
			$this->db->where('email', '=', $opts['email']);
		}

		if (isset($opts['password'])) {
			$this->db->where('password', '=', $opts['password']);
		}

		$result = $this->db->get();

		return $result;
	}
}