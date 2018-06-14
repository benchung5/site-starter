<?php

include_once './config.php';
require_once './lib/uri.php';

//autoload controller classes
function __autoload($class_name) 
{
    if (file_exists('./controllers/'.$class_name.'.php')) {
      require_once './controllers/'.$class_name.'.php';
    }
}

$segments = Uri::get_parts();
$controller = Config::paths('CONTROLLER_PATH') . $segments['controller'] . '.php';

if (file_exists($controller)) {
	$contr = new $segments['controller'];
	if (method_exists($contr, $segments['action'])) {
		call_user_func_array([$contr, $segments['action']], $segments['params']);
	}
	//call controller intex function
	$contr->index();
	//run footer scripts
	$contr->run_scripts();
} else {
	$main_content = Config::paths('VIEW_PATH') . '404.php';
	include Config::paths('VIEW_PATH'). 'layout.php';
}
