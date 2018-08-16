<?php
namespace Lib;
use Config\Config;
use Lib\Utils;
use Lib\Validation\Validator;

class Controller 
{
	protected $view;
	protected $model;
	protected $scripts = [];
	public $validator = null;

	public function __construct() 
	{
		$this->validator = new Validator();
	}

	public function render($view_name, $data = [])
	{
		$this->view = new View();
		$data['current_page'] = strtolower($this->get_class_name());
		$this->view->render($view_name, $data);
	}

	public function load_model($model_file)
	{
		$path = Config::paths('MODEL_PATH').$model_file.'.php';
		if (file_exists($path)) {
			include_once($path);
			return new $model_file();
		}
	}

	public function load_script($path)
	{
		//store script paths
		$this->scripts[] = $path;
	}

	public function run_scripts()
	{
		// footer scripts
		echo '<script src="'.Config::paths('ROOT_URL').'assets/js/angular/app.js"></script>';

		foreach ($this->scripts as $script) {
			echo '<script src="'.Config::paths('ROOT_URL').'assets/js/angular/'.$script.'"></script>';
		}
		
	}

	private function get_class_name()
	{
		$class_name = get_class($this);

		//if it's a namespaced class
	    if ($pos = strrpos($class_name, '\\')) {
	    	return substr($class_name, $pos + 1);
	    }
	  
	    return $pos;
	}
}