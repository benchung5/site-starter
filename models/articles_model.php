<?php

use Lib\Model;
use Lib\Utils;

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

		if ($result) {
			// get images
			$result->images = $this->db->table('files')
				->select('id, name')
				->where('ref_id', $result->id)
				// ->orderBy('sort_order, name')
				->getAll();

			// get categories
			$result->categories = $this->db->table('article_categories at')
				->select('t.id, t.name')
				->where('article_id', $result->id)
				->innerJoin('categories t', 't.id', 'at.category_id')
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

	public function count()
	{
		$result = $this->db->table('articles')->count('id', 'total_rows')->get();
		if ($result) {
			return (int)$result->total_rows;
		} 
		return false;
	}

	public function add($data, $categories)
	{
		if (is_array($data)) {
			$this->db->table('articles')->insert($data);
			$new_article_id = $this->db->insertId();
			$categories = (! is_array($categories)) ? explode(',', $categories) : $categories;

			foreach ($categories as $category) {
				$ins = ['article_id' => $new_article_id, 'category_id' => $category];
				$this->db->table('article_categories')->insert($ins);
			}
			
			return $new_article_id;
		}

		return false;
	}

	public function remove($opts = [])
	{
		if ($opts) {
			$this->db->table('articles');

			if (isset($opts['id'])) {
				$this->db->where('id', '=', $opts['id']);
			}

			if (isset($opts['slug'])) {
				$this->db->where('slug', '=', $opts['slug']);
			}

			$article = $this->db->get();

			$deleted_article_id = $article->id;

			$this->db->table('articles')->where('id', $deleted_article_id)->delete();

			// remove categories
			$this->db->table('article_categories')->where('article_id', $deleted_article_id)->delete();

			// remove files
			$this->db->table('files')->where('ref_id', $deleted_article_id)->delete();

			return $deleted_article_id;
		}

		return false;
	}

	public function get_all($opts = []) 
	{
		$this->db->table('articles a');

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

		if (isset($opts['categories'])) {
			if (count($opts['categories']) > 0) {
				$this->db
					->innerJoin('article_categories at', 'at.article_id', 'a.id')
					->innerJoin('categories t', 't.id', 'at.category_id')
					->in('t.id', $opts['categories']);
			} else {
				// force no results since category is queried but no category is selected
				return [];
			}
		}

		if (isset($opts['like'])) {
			$this->db->grouped(function($q, $opts) {
				$q->like('a.name', '%'.$opts['like'].'%')->orLike('a.slug', '%'.$opts['like'].'%');
			}, $opts);
		}

		//include images
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
			$this->db->table('articles');
			$this->db->where($opts['where'])->update($opts['update']);
		}
		if (isset($opts['categories'])) {
			$article_id = $this->db->table('articles')->where($opts['where'])->get()->id;

			// clear existing associations
			$this->db->table('article_categories')->where('article_id', $article_id)->delete();

			// insert new associations
			$categories = is_array($opts['categories']) ? $opts['categories'] : explode(',', $opts['categories']);
			foreach ($categories as $category_id) {
				$this->db->table('article_categories')->insert(['article_id' => $article_id, 'category_id' => $category_id]);
			}
		}
	}
}