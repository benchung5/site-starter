<?php

use Lib\Model;
use Lib\Utils;

class Trees_model extends Model
{
	public $options;

	public function __construct() {
		parent::__construct();
	}

	public function get($opts = [])
	{
		$this->db->table('trees')->select('*');

		if (isset($opts['id'])) {
			$this->db->where('id', '=', $opts['id']);
		}

		if (isset($opts['slug'])) {
			$this->db->where('slug', '=', $opts['slug']);
		}

		$result = $this->db->get();

		if ($result) {
			// get images
			$result->images = $this->db->table('files_trees')
				->select('id, name')
				->where('ref_id', $result->id)
				// ->orderBy('sort_order, name')
				->getAll();

			$result->origins = $this->db->table('trees_origins _to')
				->select('o.id, o.name')
				->where('tree_id', $result->id)
				->innerJoin('origins o', 'o.id', '_to.origin_id')
				->getAll();

			// include categories
			$trees_category = $this->db->table('trees_category')
				->select('name')
				->where('id', $result->trees_category_id)
				->get();

			$result->trees_category_name = $trees_category ? $trees_category->name : '';
			
			return $result;
		}

		return false;
	}

	public function add($data, $origins)
	{
		if (is_array($data)) {
			$this->db->table('trees')->insert($data);
			$new_tree_id = $this->db->insertId();
			$origins = (! is_array($origins)) ? explode(',', $origins) : $origins;

			foreach ($origins as $origin) {
				$ins = ['tree_id' => $new_tree_id, 'origin_id' => $origin];
				$this->db->table('trees_origins')->insert($ins);
			}
			
			return $new_tree_id;
		}

		return false;
	}

	public function remove($opts = [])
	{
		if ($opts) {
			$this->db->table('trees');

			if (isset($opts['id'])) {
				$this->db->where('id', '=', $opts['id']);
			}

			if (isset($opts['slug'])) {
				$this->db->where('slug', '=', $opts['slug']);
			}

			$tree = $this->db->get();

			$deleted_tree_id = $tree->id;

			$this->db->table('trees')->where('id', $deleted_tree_id)->delete();

			// remove associations
			$this->db->table('trees_origins')->where('tree_id', $deleted_tree_id)->delete();

			return $deleted_tree_id;
		}

		return false;
	}

	public function get_all($opts = []) 
	{
		$this->db->table('trees t');

		if (isset($opts['select'])) {
			$this->db->select(implode(',', $opts['select']));
		} else {
			$this->db->select('t.id, t.slug, t.common_name, t.trees_category_id');
		}

		if (isset($opts['offset'])) {
			$this->db->limit($opts['offset'], $opts['limit']);
		}

		if (isset($opts['trees_category'])) {
			if (count($opts['trees_category']) > 0) {
				$this->db->in('t.trees_category_id', $opts['trees_category']);
			} else {
				// force no results since trees_category is queried but no trees_category is selected
				return [];
			}
		}

		if (isset($opts['origins'])) {
			if (count($opts['origins']) > 0) {
				$this->db
					->innerJoin('trees_origins to', 'to.tree_id', 't.id')
					->innerJoin('origins o', 'o.id', 'to.origin_id')
					->in('t.id', $opts['origins']);
			} else {
				// force no results since origin is queried but no origin is selected
				return [];
			}
		}

		if (isset($opts['like'])) {
			$this->db->grouped(function($q, $opts) {
				$q->like('t.common_name', '%'.$opts['like'].'%')
				->orLike('t.slug', '%'.$opts['like'].'%');
			}, $opts);
		}

		// include images
		$this->db
			->select('GROUP_CONCAT(f.name ORDER BY f.sort_order, f.name) AS images')
			->leftJoin('files f', 'f.ref_id', 't.id')
			->groupBy('t.id');

		$result = $this->db->getAll();

		return $result;
	}

	public function update($opts = [])
	{
		if (isset($opts['where']) && isset($opts['update'])) {
			$this->db->table('trees');
			$this->db->where($opts['where'])->update($opts['update']);
		}
		if (isset($opts['origins'])) {
			$tree_id = $this->db->table('trees')->where($opts['where'])->get()->id;

			// clear existing associations
			$this->db->table('trees_origins')->where('tree_id', $tree_id)->delete();

			// insert new associations
			$origins = is_array($opts['origins']) ? $opts['origins'] : explode(',', $opts['origins']);
			foreach ($origins as $origin_id) {
				$this->db->table('trees_origins')->insert(['tree_id' => $tree_id, 'origin_id' => $origin_id]);
			}
		}
	}
}