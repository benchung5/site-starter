<?php
require_once './vendor/autoload.php';
use Config\Config;
use Controllers\Index;
use Lib\Uri;

$segments = Uri::get_parts();
$controller = Config::paths('CONTROLLER_PATH') . $segments['controller'] . '.php';

if (file_exists($controller)) {
	$controller_class_name = "Controllers\\".$segments['controller'];
	$contr = new $controller_class_name;
	if (method_exists($contr, $segments['action'])) {
		call_user_func_array([$contr, $segments['action']], $segments['params']);
	}
	//call controller index function
	$contr->index();
	//run footer scripts
	$contr->run_scripts();
} else {
	$main_content = Config::paths('VIEW_PATH') . '404.php';
	include Config::paths('VIEW_PATH'). 'layout.php';
}
