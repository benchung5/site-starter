<?php

use Lib\Model;

class Tags_files_articles_model extends Model
{
	public $options;

	public function __construct() 
	{
		parent::__construct();
	}

	public function get_all($opts = []) 
	{
		$this->db->table('tags_files_articles');
		
		if ($opts) {
			$this->db->select(implode(',', $opts));
		} else {
			$this->db->select('*');
		}

		$result = $this->db->getAll();
		return $result;
	}

	public function get($id) 
	{
		$this->db->table('tags_files_articles')->select('*');

		if ($id) {
			$this->db->where('id', '=', $id);
		}

		$result = $this->db->get();
		
		return $result;
	}
}