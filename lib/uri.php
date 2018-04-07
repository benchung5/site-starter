<?php

class Uri 
{
	public function __construct() {
	}

	private function _get_current_uri()
	{
	    $basepath = implode('/', array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1)) . '/';
	    $uri = substr($_SERVER['REQUEST_URI'], strlen($basepath));
	    if (strstr($uri, '?')) $uri = substr($uri, 0, strpos($uri, '?'));
	    //$uri = '/' . trim($uri, '/');
	    $uri = trim($uri, '/');
	    return $uri;
	}

	private function get_segments()
	{
		$base_url = self::_get_current_uri();

		$segments = array();
		$url_array = explode('/', $base_url);

		foreach($url_array as $segment)
		{
		    if(trim($segment) != '')
		        array_push($segments, $segment);
		}

		return $segments;
	}

	public static function get_parts() 
	{
		$segments = self::get_segments();
		$parts = [];

		$parts['controller'] = isset($segments[0]) ? $segments[0] : 'index';
		$parts['action'] = isset($segments[1]) ? $segments[1] : 'index';
		//params for the action
		unset($segments[0], $segments[1]);
		$parts['params'] = (!empty($segments)) ? array_values($segments) : [];

		return $parts;
	}
}