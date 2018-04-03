<?php

require_once('route.php');

function __autoload($class_name) 
{
    if (file_exists('./controllers/'.$class_name.'.php')) {
      require_once './controllers/'.$class_name.'.php';
    }
}

Route::set('index.php', function() {
	Index::create_view('index');
});

Route::set('about-us', function() {
	About_us::create_view('about_us');
});

Route::set('contact-us', function() {
	Contact_us::create_view('contact_us');
});