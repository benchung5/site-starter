<?php

use Lib\Model;

class Users_model extends Model
{
	public function __construct() {
		parent::__construct();
	}

	public function get_user($opts = []) 
	{

		$this->db->table('users')->select('*');

		if (isset($opts['id'])) {
			$this->db->where('id', '=', $opts['id']);
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

	public function add_user($data)
	{
		if (is_array($data) && isset($data['email'])) {

			$this->db->table('users')->insert($data);

			return $data['email'];
		}
	}
}