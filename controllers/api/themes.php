<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;


class Themes extends Controller 
{
	protected $themes = null;

	public function __construct() 
	{
		$this->themes = $this->load_model('Themes_model');

		parent::__construct();
	}

	public function index()
	{

	}

	public function create()
	{
		$data = Utils::json_read();

		$this->validator->addEntries(['slug' => $data['slug']]);
		$this->validator->addRule('slug', 'Must be a valid slug', 'slug');
		$this->validator->validate();

		if ($this->validator->foundErrors()) {
		    $errors = $this->validator->getErrors();
		    Utils::json_respond_error(VALIDATE_PARAMETER_DATATYPE, implode(', ', $errors));
		}

		try {
			$this->themes->add(['slug' => $data['slug'], 'name' => $data['name'], 'created_on' => date('Y-m-d')]);

			$id = $this->themes->db->insertId();

			$new_theme = $this->themes->get(['id' => $id]);

			Utils::json_respond(SUCCESS_RESPONSE, $new_theme);
		} catch (Exception $e) {
			Utils::json_respond_error(JWT_PROCESSING_ERROR, $e->getMessage());
		}
	}

	public function delete()
	{
		$data = Utils::json_read();

		$this->themes->remove(['slug' => $data['slug']]);

		Utils::json_respond(SUCCESS_RESPONSE, $data['name']);
	}

	public function all() 
	{
		$themes = $this->themes->get_all(['id', 'slug', 'name']);
		if ($themes) {
			Utils::json_respond(SUCCESS_RESPONSE, $themes);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}

	public function single($slug) 
	{
		$themes = $this->themes->get(['slug' => $slug]);
		if ($themes) {
			Utils::json_respond(SUCCESS_RESPONSE, $themes);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}

	public function update() 
	{
		$data = Utils::json_read();

		try {
			$this->themes->update(['where' => ['slug' => $data['slug']], 'update' => ['name' => $data['name']]]);

			Utils::json_respond(SUCCESS_RESPONSE, $data);	
		} catch (Exception $e) {
			Utils::json_respond_error(JWT_PROCESSING_ERROR, $e->getMessage());
		}		
	}
}