<?php
namespace Lib;
use Config\Config;

class Controller 
{
	protected $view;
	protected $model;
	protected $scripts = [];

	public function __construct() {
	}

	public function render($view_name, $data = [])
	{
		$this->view = new View();
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
}