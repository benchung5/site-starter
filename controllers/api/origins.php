<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;


class Origins extends Controller 
{
	protected $origins = null;

	public function __construct() 
	{
		$this->origins = $this->load_model('Origins_model');

		parent::__construct();
	}

	public function index()
	{

	}

	// public function create()
	// {
	// 	$data = Utils::json_read();

	// 	$this->validator->addEntries(['slug' => $data['slug']]);
	// 	$this->validator->addRule('slug', 'Must be a valid slug', 'slug');
	// 	$this->validator->validate();

	// 	if ($this->validator->foundErrors()) {
	// 	    $errors = $this->validator->getErrors();
	// 	    Utils::json_respond_error(VALIDATE_PARAMETER_DATATYPE, implode(', ', $errors));
	// 	}

	// 	try {
	// 		$this->origins->add(['slug' => $data['slug'], 'name' => $data['name'], 'created_on' => date('Y-m-d')]);

	// 		$id = $this->origins->db->insertId();

	// 		$new_origin = $this->origins->get(['id' => $id]);

	// 		Utils::json_respond(SUCCESS_RESPONSE, $new_origin);
	// 	} catch (Exception $e) {
	// 		Utils::json_respond_error(JWT_PROCESSING_ERROR, $e->getMessage());
	// 	}
	// }

	// public function delete()
	// {
	// 	$data = Utils::json_read();

	// 	$this->origins->remove(['slug' => $data['slug']]);

	// 	Utils::json_respond(SUCCESS_RESPONSE, $data['name']);
	// }

	public function all() 
	{
		$origins = $this->origins->get_all(['id', 'name']);
		if ($origins) {
			Utils::json_respond(SUCCESS_RESPONSE, $origins);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}

	// public function single($slug) 
	// {
	// 	$origins = $this->origins->get(['slug' => $slug]);
	// 	if ($origins) {
	// 		Utils::json_respond(SUCCESS_RESPONSE, $origins);
	// 	} else {
	// 		Utils::json_respond(SUCCESS_RESPONSE, array());
	// 	}
	// }

	// public function update() 
	// {
	// 	$data = Utils::json_read();

	// 	try {
	// 		$this->origins->update(['where' => ['slug' => $data['slug']], 'update' => ['name' => $data['name']]]);

	// 		Utils::json_respond(SUCCESS_RESPONSE, $data);	
	// 	} catch (Exception $e) {
	// 		Utils::json_respond_error(JWT_PROCESSING_ERROR, $e->getMessage());
	// 	}		
	// }
}