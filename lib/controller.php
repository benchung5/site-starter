<?php
include_once('./lib/database.php');
include_once('./lib/view.php');

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
}