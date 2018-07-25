<?php
require_once './vendor/autoload.php';
use Config\Config;
use Controllers\Index;
use Lib\Uri;

Config::define_constants();

$segments = Uri::get_parts();
$controller_dir = isset($segments['controller_dir']) ? $segments['controller_dir'].'/' : '';
$controller = Config::paths('CONTROLLER_PATH').$controller_dir.$segments['controller'].'.php';

if (file_exists($controller)) {
	$controller_dir_namespace = isset($segments['controller_dir']) ? $segments['controller_dir']."\\" : '';
	$controller_class_name = "Controllers\\".$controller_dir_namespace.$segments['controller'];
	$contr = new $controller_class_name;
	if (method_exists($contr, $segments['action'])) {
		call_user_func_array([$contr, $segments['action']], $segments['params']);
	}
	//run footer scripts
	$contr->run_scripts();
} else {
	$main_content = Config::paths('VIEW_PATH') . '404.php';
	//include Config::paths('VIEW_PATH'). 'layout.php';
	include_once './layout.php';
}
