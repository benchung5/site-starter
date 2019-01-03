<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;
use Lib\Upload;


class Trees extends Controller 
{
	protected $trees = null;

	public function __construct() 
	{
		$this->trees = $this->load_model('trees_model');

		parent::__construct();
	}

	public function index()
	{

	}

	public function create()
	{
		//handle posted input
		$data = Utils::read_post();

		$this->validator->addEntries(['slug' => $data['slug']]);
		$this->validator->addRule('slug', 'Must be a valid slug', 'slug');
		$this->validator->validate();

		if ($this->validator->foundErrors()) {
		    $errors = $this->validator->getErrors();
		    Utils::json_respond_error(VALIDATE_PARAMETER_DATATYPE, implode(', ', $errors));
		}

		try {
			$new_tree_id = $this->trees->add([
				'slug' => $data['slug'], 
				'common_name' => $data['common_name'],
				'genus_id' => $data['genus_id'],
				'specific_epithet' => $data['specific_epithet'],
				'trees_category_id' => $data['trees_category_id'],
				'body' => $data['body']
			], $data['origins']);

			$new_tree = $this->trees->get(['id' => $new_tree_id]);

			//handle file uploads
			Upload::upload('trees', $new_tree_id);

			Utils::json_respond(SUCCESS_RESPONSE, $new_tree);
		} catch (Exception $e) {
			Utils::json_respond_error('Could not create tree', $e->getMessage());
		}
	}

	public function delete()
	{
		$data = Utils::json_read();

		$this->trees->remove(['slug' => $data['slug']]);

		Utils::json_respond(SUCCESS_RESPONSE, $data['slug']);
	}

	public function all() 
	{
		$trees = $this->trees->get_all();
		if ($trees) {
			Utils::json_respond(SUCCESS_RESPONSE, $trees);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}

	public function single($slug) 
	{
		$tree = $this->trees->get(['slug' => $slug]);
		if ($tree) {
			Utils::json_respond(SUCCESS_RESPONSE, $tree);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}

	public function update() 
	{
		$files = $this->load_model('files_trees_model');

		$data = Utils::read_post();

		$this->validator->addEntries(['slug' => $data['slug']]);
		$this->validator->addRule('slug', 'Must be a valid slug', 'slug');
		$this->validator->validate();

		if ($this->validator->foundErrors()) {
		    $errors = $this->validator->getErrors();
		    Utils::json_respond_error(VALIDATE_PARAMETER_DATATYPE, implode(', ', $errors));
		}

		try {
			$this->trees->update([
				'where' => ['slug' => $data['slug']], 
				'update' => [
					'common_name' => $data['common_name'],
					'genus_id' => $data['genus_id'],
					'specific_epithet' => $data['specific_epithet'],
					'trees_category_id' => $data['trees_category_id'],
					'body' => $data['body']
				],
				'origins' => $data['origins']
			]);

			$new_tree = $this->trees->get(['slug' => $data['slug']]);

			// new file uploads
			Upload::upload('trees', $new_tree->id);
			// update original file uploads
			if (isset($data['deleted_images'])) {
				$files->update_associations('trees', $new_tree->id, $data['deleted_images']);	
			}

			Utils::json_respond(SUCCESS_RESPONSE, $data);	
		} catch (Exception $e) {
			Utils::json_respond_error(JWT_PROCESSING_ERROR, $e->getMessage());
		}		
	}

	public function search_admin() 
	{
		$data = Utils::read_get();

		$trees = $this->trees->get_all([
			'offset' => $data['offset'], 
			'limit' => $data['limit'],
			'like' => isset($data['search']) ? $data['search'] : null
		]);

		$result = ['trees' => $trees, 'count' => count($trees), 'offset' => $data['offset'], 'limit' => $data['limit']];

		if ($trees) {
			Utils::json_respond(SUCCESS_RESPONSE, $result);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, ['trees' => [], 'count' => 0, 'offset' => 0, 'limit' => $data['limit']]);
		}		
	}

	public function search() 
	{
		$data = Utils::read_get();

		$trees = $this->trees->get_all([
			'offset' => $data['offset'], 
			'limit' => $data['limit'],
			'like' => isset($data['search']) ? $data['search'] : null, 
			'trees_category' => isset($data['categoriesTrees']) ? $data['categoriesTrees'] : [], 
			'origins' => isset($data['origins']) ? $data['origins'] : [],
			'select' => ['t.id', 't.slug', 't.common_name', 't.trees_category_id']
		]);

		$result = ['trees' => $trees, 'count' => count($trees), 'offset' => $data['offset'], 'limit' => $data['limit']];

		if ($trees) {
			Utils::json_respond(SUCCESS_RESPONSE, $result);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, ['trees' => [], 'count' => 0, 'offset' => 0, 'limit' => $data['limit']]);
		}		
	}
}