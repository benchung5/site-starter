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

		if ($result) {
			$result->images = [];

			// get themes
			$themes = $this->db->table('article_themes at')
				->select('t.id, t.name')
				->where('article_id', $result->id)
				->innerJoin('themes t', 't.id', 'at.theme_id')
				->getAll();

			$result->themes = $themes;
			
			return $result;
		}

		return false;
	}

	public function add($data, $themes)
	{
		if (is_array($data)) {

			$this->db->table('articles')->insert($data);
			$new_article_id = $this->db->insertId();
			$themes = (! is_array($themes)) ? explode(',', $themes) : $themes;

			foreach ($themes as $theme) {
				$ins = ['article_id' => $new_article_id, 'theme_id' => $theme];
				$this->db->table('article_themes')->insert($ins);
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

			// remove associations
			$this->db->table('article_themes')->where('article_id', $deleted_article_id)->delete();

			return $deleted_article_id;
		}

		return false;
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
		if (isset($opts['themes'])) {
			$article_id = $this->db->table('articles')->where($opts['where'])->get()->id;

			// clear existing associations
			$this->db->table('article_themes')->where('article_id', $article_id)->delete();

			// insert new associations
			$themes = is_array($opts['themes']) ? $opts['themes'] : explode(',', $opts['themes']);
			foreach ($themes as $theme_id) {
				$this->db->table('article_themes')->insert(['article_id' => $article_id, 'theme_id' => $theme_id]);
			}
		}
	}
}