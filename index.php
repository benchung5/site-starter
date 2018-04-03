<?php

include_once './config.php';

//require_once('./routes/routes.php');

/*
The following function will strip the script name from URL
i.e.  http://www.something.com/search/book/fitzgerald will become /search/book/fitzgerald
*/
function getCurrentUri()
{
    $basepath = implode('/', array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1)) . '/';
    $uri = substr($_SERVER['REQUEST_URI'], strlen($basepath));
    if (strstr($uri, '?')) $uri = substr($uri, 0, strpos($uri, '?'));
    //$uri = '/' . trim($uri, '/');
    $uri = trim($uri, '/');
    return $uri;
}

$base_url = getCurrentUri();

$segments = array();
$url_array = explode('/', $base_url);

foreach($url_array as $segment)
{
    if(trim($segment) != '')
        array_push($segments, $segment);
}

print_r($segments);