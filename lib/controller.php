<?php
namespace Lib;
use Config\Config;
use Lib\Validation\Validator;
use Lib\Meta;
use Lib\Utils;

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

	public function render($view_name, $data = [], $page_title = '', $page_description = '', $head_scripts = '')
	{
		$this->view = new View();
		$data['current_page'] = strtolower($this->get_class_name());
		$data['head_scripts'] = $head_scripts;
		

		if ($page_title) {
			Meta::set_page_title($page_title);
		}

		if ($page_description) {
			Meta::set_page_description($page_description);
		}

		$this->view->render($view_name, $data);
	}

	public static function load_model($model_file)
	{
		$path = Config::paths('MODEL_PATH').$model_file.'.php';
		if (file_exists($path)) {
			include_once($path);
			return new $model_file();
		}
	}

	public function load_script($script, $parameter = null)
	{
		
		if ($parameter) {
			//store script paths
			$this->scripts[] = array($script, $parameter);
			
		} else {
			//store script paths
			$this->scripts[] = $script;
		}
	}

	public function run_scripts()
	{

		// footer scripts
		foreach ($this->scripts as $script) {
			if (is_array($script)) {
				echo '<script src="'.Config::paths('ROOT_URL').'assets/js/'.$script[0].'" '.$script[1].'></script>';
			} else {
				echo '<script src="'.Config::paths('ROOT_URL').'assets/js/'.$script.'"></script>';
			}
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