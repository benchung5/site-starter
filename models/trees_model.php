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
			$result->images = $this->db->table('files')
				->select('id, name')
				->where('ref_id', $result->id)
				// ->orderBy('sort_order, name')
				->getAll();

			// get themes
			$result->themes = $this->db->table('tree_themes at')
				->select('t.id, t.name')
				->where('tree_id', $result->id)
				->innerJoin('themes t', 't.id', 'at.theme_id')
				->getAll();

			// include categories
			$category = $this->db->table('categories')
				->select('name')
				->where('id', $result->category_id)
				->get();

			$result->category_name = $category ? $category->name : '';
			
			return $result;
		}

		return false;
	}

	public function add($data, $themes)
	{
		if (is_array($data)) {
			$this->db->table('trees')->insert($data);
			$new_tree_id = $this->db->insertId();
			$themes = (! is_array($themes)) ? explode(',', $themes) : $themes;

			foreach ($themes as $theme) {
				$ins = ['tree_id' => $new_tree_id, 'theme_id' => $theme];
				$this->db->table('tree_themes')->insert($ins);
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
			$this->db->table('tree_themes')->where('tree_id', $deleted_tree_id)->delete();

			return $deleted_tree_id;
		}

		return false;
	}

	public function get_all($opts = []) 
	{
		$this->db->table('trees a');

		if (isset($opts['select'])) {
			$this->db->select(implode(',', $opts['select']));
		} else {
			$this->db->select('a.id, a.slug, a.name, a.category_id');
		}

		if (isset($opts['offset'])) {
			$this->db->limit($opts['offset'], $opts['limit']);
		}

		if (isset($opts['category'])) {
			if (count($opts['category']) > 0) {
				$this->db->in('a.category_id', $opts['category']);
			} else {
				// force no results since category is queried but no category is selected
				return [];
			}
		}

		if (isset($opts['themes'])) {
			if (count($opts['themes']) > 0) {
				$this->db
					->innerJoin('tree_themes at', 'at.tree_id', 'a.id')
					->innerJoin('themes t', 't.id', 'at.theme_id')
					->in('t.id', $opts['themes']);
			} else {
				// force no results since theme is queried but no theme is selected
				return [];
			}
		}

		if (isset($opts['like'])) {
			$this->db->grouped(function($q, $opts) {
				$q->like('a.name', '%'.$opts['like'].'%')->orLike('a.slug', '%'.$opts['like'].'%');
			}, $opts);
		}

		// include images
		$this->db
			->select('GROUP_CONCAT(f.name ORDER BY f.sort_order, f.name) AS images')
			->leftJoin('files f', 'f.ref_id', 'a.id')
			->groupBy('a.id');

		$result = $this->db->getAll();

		return $result;
	}

	public function update($opts = []) 
	{
		if (isset($opts['where']) && isset($opts['update'])) {
			$this->db->table('trees');
			$this->db->where($opts['where'])->update($opts['update']);
		}
		if (isset($opts['themes'])) {
			$tree_id = $this->db->table('trees')->where($opts['where'])->get()->id;

			// clear existing associations
			$this->db->table('tree_themes')->where('tree_id', $tree_id)->delete();

			// insert new associations
			$themes = is_array($opts['themes']) ? $opts['themes'] : explode(',', $opts['themes']);
			foreach ($themes as $theme_id) {
				$this->db->table('tree_themes')->insert(['tree_id' => $tree_id, 'theme_id' => $theme_id]);
			}
		}
	}
}