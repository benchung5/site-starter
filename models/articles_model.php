<?php

use Lib\Model;

class Articles_model extends Model
{
	public $options;

	public function __construct() {
		parent::__construct();
	}

	public function get($opts = [])
	{
		$this->db->table('articles')->select('*');

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

			$this->db->table('articles')->insert($data);

			return $this->db->insertId();
		}
	}

	public function remove($opts = []) 
	{
		$this->db->table('articles');

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
		$this->db->table('articles');

		if (isset($opts['select'])) {
			$this->db->select(implode(',', $opts['select']));
		} else {
			$this->db->select('*');
		}

		if (isset($opts['limit'])) {
			$this->db->limit($opts['limit']);
		}

		$result = $this->db->getAll();
		return $result;
	}

	public function update($opts = []) 
	{
		if (isset($opts['where']) && isset($opts['update'])) {
			$this->db->table('articles');
			$this->db->where($opts['where'])->update($opts['update']);
		}
	}
}