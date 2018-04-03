<?php

class Route {

	public static $validRoutes = array();

	public static function set($route = null, $callback = null) 
	{

		self::$validRoutes[] = $route;

		if (isset($_GET['url'])) {
			//if the current url matches the provided route,
			//execute the callback
			if ($_GET['url'] == $route) {
				$callback->__invoke();
			}
		}
	}
}

