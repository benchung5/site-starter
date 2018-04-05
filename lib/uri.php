<?php

class Uri 
{
	/*
	The following function will strip the script name from URL
	i.e.  http://www.something.com/search/book/fitzgerald will become /search/book/fitzgerald
	*/
	private function _get_current_uri()
	{
	    $basepath = implode('/', array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1)) . '/';
	    $uri = substr($_SERVER['REQUEST_URI'], strlen($basepath));
	    if (strstr($uri, '?')) $uri = substr($uri, 0, strpos($uri, '?'));
	    //$uri = '/' . trim($uri, '/');
	    $uri = trim($uri, '/');
	    return $uri;
	}

	public static function get_segments()
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
}