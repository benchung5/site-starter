<?php

use Lib\Model;

class Subscribers_model extends Model
{
	public function __construct() {
		parent::__construct();
	}

	public function add_subscriber($email)
	{
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			return false;
		}

		// Check if email already exists
		$existing = $this->db->table('subscribers')
			->select('*')
			->where('email', '=', $email)
			->get();

		if ($existing) {
			return false; // Email already subscribed
		}

		// Insert new subscriber
		$data = [
			'email' => $email,
			'subscribed_on' => time(),
			'active' => 1
		];

		$this->db->table('subscribers')->insert($data);
		return $this->db->insertId();
	}

	public function get_all($opts = []) {
		$this->db->table('subscribers');

		if (isset($opts['select'])) {
			$this->db->select($opts['select']);
		} else {
			$this->db->select('*');
		}

		if (isset($opts['active'])) {
			$this->db->where('active', '=', $opts['active']);
		}

		$result = $this->db->orderBy('subscribed_on', 'DESC')->getAll();
		return $result;
	}

	public function unsubscribe($email)
	{
		$this->db->table('subscribers')
			->where('email', '=', $email)
			->update(['active' => 0]);
	}
}
