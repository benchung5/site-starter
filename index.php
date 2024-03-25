<?php
require_once './vendor/autoload.php';
use Config\Config;
use Controllers\Index;
use Lib\Uri;
use Lib\Utils;


Config::define_constants();

$segments = Uri::get_parts();

$controller_dir = isset($segments['controller_dir']) ? $segments['controller_dir'].'/' : '';

//convert first letter to uppercase
$controller = ucfirst($segments['controller']);

$controller_path = Config::paths('CONTROLLER_PATH').$controller_dir.$controller.'.php';

if (file_exists($controller_path)) {
	$controller_dir_namespace = isset($segments['controller_dir']) ? $segments['controller_dir']."\\" : '';
	$controller_class_name = "Controllers\\".$controller_dir_namespace.$controller;
	$contr = new $controller_class_name;

	// if it's an article view, handle differently because of category slug
	if (($controller == 'Articles' || $controller == 'Plants') && $segments['action'] && isset($segments['params'][0]) && (!isset($segments['controller_dir']))) {
		call_user_func_array([$contr, 'view'], [$segments['action'], $segments['params'][0]]);
	} else 	if (method_exists($contr, $segments['action'])) {
		call_user_func_array([$contr, $segments['action']], $segments['params']);
	}

	//run footer scripts
	$contr->run_scripts();
} else {
	$contr = new Controllers\Four_o_four;
	call_user_func_array([$contr, 'index'], []);
}
