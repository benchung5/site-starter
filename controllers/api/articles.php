<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;


class Articles extends Controller 
{
	protected $articles = null;

	public function __construct() 
	{
		$this->articles = $this->load_model('articles_model');

		parent::__construct();
	}

	public function index()
	{

	}

	public function create()
	{
		$files_data = Utils::upload('articles');

		Utils::dbug(json_encode($files_data));
		//save the file data to the db
		//$new_id = $this->files->save($files_data);
		//move file, append new id


		$data = Utils::read_post();

		$this->validator->addEntries(['slug' => $data['slug']]);
		$this->validator->addRule('slug', 'Must be a valid slug', 'slug');
		$this->validator->validate();

		if ($this->validator->foundErrors()) {
		    $errors = $this->validator->getErrors();
		    Utils::json_respond_error(VALIDATE_PARAMETER_DATATYPE, implode(', ', $errors));
		}

		try {
			$new_article_id = $this->articles->add([
				'slug' => $data['slug'], 
				'name' => $data['name'], 
				'category_id' => $data['category'],
				'created_on' => date('Y-m-d'),
			], $data['themes']);

			$new_article = $this->articles->get(['id' => $new_article_id]);

			Utils::json_respond(SUCCESS_RESPONSE, $new_article);
		} catch (Exception $e) {
			Utils::json_respond_error('Could not create article', $e->getMessage());
		}
	}

	public function delete()
	{
		$data = Utils::json_read();

		$this->articles->remove(['slug' => $data['slug']]);

		Utils::json_respond(SUCCESS_RESPONSE, $data['slug']);
	}

	public function all() 
	{
		$articles = $this->articles->get_all(['id', 'slug', 'name']);
		if ($articles) {
			Utils::json_respond(SUCCESS_RESPONSE, $articles);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}

	public function single($slug) 
	{
		$article = $this->articles->get(['slug' => $slug]);
		if ($article) {
			Utils::json_respond(SUCCESS_RESPONSE, $article);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}

	public function update() 
	{
		$files = Utils::upload();
		$data = Utils::read_post();

		$this->validator->addEntries(['slug' => $data['slug']]);
		$this->validator->addRule('slug', 'Must be a valid slug', 'slug');
		$this->validator->validate();

		if ($this->validator->foundErrors()) {
		    $errors = $this->validator->getErrors();
		    Utils::json_respond_error(VALIDATE_PARAMETER_DATATYPE, implode(', ', $errors));
		}

		try {
			$this->articles->update([
				'where' => ['slug' => $data['slug']], 
				'update' => ['name' => $data['name']],
				'themes' => $data['themes']
			]);

			Utils::json_respond(SUCCESS_RESPONSE, $data);	
		} catch (Exception $e) {
			Utils::json_respond_error(JWT_PROCESSING_ERROR, $e->getMessage());
		}		
	}

	public function search_admin() 
	{
		$data = Utils::read_get();

		$articles = $this->articles->get_all(['offset' => $data['offset'], 'limit' => $data['limit']]);

		$result = ['articles' => $articles, 'count' => count($articles), 'offset' => $data['offset'], 'limit' => $data['limit']];

		if ($articles) {
			Utils::json_respond(SUCCESS_RESPONSE, $result);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, ['articles' => [], 'count' => 0, 'offset' => 0, 'limit' => $data['limit']]);
		}		
	}
}