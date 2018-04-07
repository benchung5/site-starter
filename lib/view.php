<?php
include_once './config.php';

class View 
{
	public function __construct() 
	{
	}

	public function render($view_file, $view_data )
	{
		$view_path = './views/'.$view_file.'.php';
		if (file_exists($view_path)) {

			$main_content = $view_path;
			include Config::paths('VIEW_PATH'). 'layout.php';
		}
	}

	// public function getAction() 
	// {
	// 	return (explode('/', $this->view_file)[1])
	// }
}