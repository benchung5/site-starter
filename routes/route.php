<?php

require_once('uri.php');

function __autoload($class_name) 
{
    if (file_exists('./controllers/'.$class_name.'.php')) {
      require_once './controllers/'.$class_name.'.php';
    }
}

class Route {

	public static $validRoutes = array();

	public static function set($route = null, $callback = null) 
	{

		self::$validRoutes[] = $route;

		$segments = Uri::get_segments();

		if (isset($segments[0])) {
			//if the current url matches the provided route,
			//execute the callback
			if ($segments[0] == $route) {
				$callback->__invoke();
			}
		}
	}
}

