<?php

use Lib\Model;

class Users_model extends Model
{
	public $options;

	public function __construct() {
		parent::__construct();

		$this->options = [
		    'cost' => 11,
		    'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
		];
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

		$result = $this->db->get();

		if ($result && isset($opts['password'])) {
			if (! password_verify($opts['password'], $result->password)) {
				$result = false;
			}
		}
		
		return $result;
	}

	public function add_user($data)
	{
		if (is_array($data) && isset($data['email'])) {

			$data['password'] = password_hash($data['password'], PASSWORD_BCRYPT, $this->options);

			$this->db->table('users')->insert($data);

			return $data['email'];
		}
	}
}