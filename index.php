<?php

include_once './config.php';
require_once './lib/uri.php';

//autoload all controller classes
function __autoload($class_name) 
{
    if (file_exists('./controllers/'.$class_name.'.php')) {
      require_once './controllers/'.$class_name.'.php';
    }
}

$segments = Uri::get_segments();

//index.php?page=proeducts
$page  = $segments[0];
$controller = $config['CONTROLLER_PATH'] . $page . '.php';
$view  = $config['VIEW_PATH'] . $page . '.php';
$_404  = $config['VIEW_PATH'] . '404.php';
if (file_exists($controller)) {
   $contr = new About_us();
}

$main_content = $_404;
if (file_exists($view)) {
   $main_content = $view;
}
include $config['VIEW_PATH']. 'layout.php';