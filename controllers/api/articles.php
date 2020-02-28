<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;
use Lib\Upload;


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
		//handle posted input
		$data = Utils::read_post();

		try {
			$new_article = $this->update_article($data, true);

			Utils::json_respond(SUCCESS_RESPONSE, $new_article);
		} catch (Exception $e) {
			Utils::json_respond_error('Could not create article', $e->getMessage());
		}
	}

	public function update() 
	{
		$data = Utils::read_post();

		try {
			$this->update_article($data, false);

			Utils::json_respond(SUCCESS_RESPONSE, $data);	
		} catch (Exception $e) {
			Utils::json_respond_error(JWT_PROCESSING_ERROR, $e->getMessage());
		}		
	}

	public function update_article($data, $is_add) {
		$files = $this->load_model('files_model');

		$this->validator->addEntries(['slug' => $data['slug']]);
		$this->validator->addRule('slug', 'Must be a valid slug', 'slug');
		$this->validator->validate();

		if ($this->validator->foundErrors()) {
		    $errors = $this->validator->getErrors();
		    Utils::json_respond_error(VALIDATE_PARAMETER_DATATYPE, implode(', ', $errors));
		}

		if ($is_add) {
			//the data for add or update
			$update_data = [
				'slug' => $data['slug'], 
				'name' => $data['name'],
				'created_on' => date('Y-m-d')
			];
			if(isset($data['body'])) { $update_data['body'] = $data['body']; };

			//joins data
			$joins_data = [
				'categories' => isset($data['categories']) ? $data['categories'] : null,
				'tags' => isset($data['tags']) ? $data['tags'] : null,
			];

			$updated_article_id = $this->articles->add(
				$update_data,
				$joins_data
			);

			$updated_article = $this->articles->get(['id' => $updated_article_id]);

		} else {
			$this->articles->update([
				'where' => ['slug' => $data['slug']], 
				'update' => [
					'name' => $data['name'],
					'body' => $data['body'],
					'images' => $data['images'],
					'featured_image' => $data['featured_image'],
				],
				'categories' => $data['categories'],
				'tags' => $data['tags']
			]);
		}

		$updated_article = $this->articles->get(['slug' => $data['slug']]);

		// new file uploads
		$new_images = Upload::upload('articles', $updated_article->id, $data);

		// update new image data into tree images
		$updated_images = $updated_article->images;

		if (isset($data['deleted_images'])) {
			$deleted_images = is_array($data['deleted_images']) ?: explode(',', $data['deleted_images']);

			// delete original file uploads if applicable
			$files->update_associations('articles', $updated_article->id, $deleted_images);

			// delete images recorded in tree
			foreach ($updated_images as $key=>$value) {
				foreach ($deleted_images as $di) {
					if ($di == $value->name) {
						unset($updated_images[$key]);
					} 
				}
			}
			//reset indexes
			$updated_images = array_values($updated_images);
		}

		if ($new_images) {
			foreach ($new_images as $ni) {
				array_push($updated_images, $ni);
			}
		}

		$this->articles->update([
			'where' => ['id' => $updated_article->id], 
			'update' => ['images' => json_encode($updated_images, true)]
		]);
		
		return $updated_article;

	}

	public function delete()
	{
		$data = Utils::json_read();

		// remove file uploads (need to do this before removing the files to get lookup)
		Upload::remove('articles', $data['article']['id']);

		$this->articles->remove(['slug' => $data['article']['slug']]);

		Utils::json_respond(SUCCESS_RESPONSE, $data['article']);
	}

	public function all() 
	{
		$articles = $this->articles->get_all();
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


	public function search()
	{
		$data = Utils::read_get();

		$opts = [
			'offset' => $data['offset'], 
			'limit' => $data['limit'], 
			'like' => isset($data['search']) ? $data['search'] : null, 
			'categories' => isset($data['categories']) ? $data['categories'] : null,
			'tags' => isset($data['tags']) ? $data['tags'] : null, 
			'select' => ['a.id', 'a.slug', 'a.name', 'a.body']
		];

		$articles = $this->articles->get_all($opts);

		//just to count the results without the offset and limit
		$count = $this->articles->get_all($opts, true);

		$result = ['articles' => $articles, 'count' => $count, 'offset' => (int)$data['offset'], 'limit' => (int)$data['limit']];

		if ($articles) {
			Utils::json_respond(SUCCESS_RESPONSE, $result);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, ['articles' => [], 'count' => 0, 'offset' => 0, 'limit' => (int)$data['limit']]);
		}		
	}
}