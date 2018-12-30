<?php

use Lib\Model;

class Themes_model extends Model
{
	public $options;

	public function __construct() {
		parent::__construct();
	}

	public function get($opts = []) 
	{
		$this->db->table('themes')->select('*');

		if (isset($opts['id'])) {
			$this->db->where('id', '=', $opts['id']);
		}

		if (isset($opts['slug'])) {
			$this->db->where('slug', '=', $opts['slug']);
		}

		$result = $this->db->get();
		
		return $result;
	}

	public function add($data)
	{
		if (is_array($data)) {

			$this->db->table('themes')->insert($data);

			return $this->db->insertId();
		}
	}

	public function remove($opts = []) 
	{
		$this->db->table('themes');

		if (isset($opts['id'])) {
			$this->db->where('id', '=', $opts['id']);
		}

		if (isset($opts['slug'])) {
			$this->db->where('slug', '=', $opts['slug']);
		}

		if ($opts) {
			$this->db->delete();
		}
	}

	public function get_all($opts = []) 
	{
		$this->db->table('themes');

		if ($opts) {
			$this->db->select(implode(',', $opts));
		} else {
			$this->db->select('*');
		}

		$result = $this->db->getAll();
		return $result;
	}

	public function update($opts = []) 
	{
		if (isset($opts['where']) && isset($opts['update'])) {
			$this->db->table('themes');
			$this->db->where($opts['where'])->update($opts['update']);
		}
	}
}