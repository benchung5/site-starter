<?php
include_once('./lib/database.php');
include_once('./lib/view.php');
include_once './config.php';

class Controller 
{
	protected $view;
	protected $model;

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
}