<?php

require_once('route.php');

Route::set('index.php', function() {
	Index::create_view('index');
});

// Route::set($segments[0], function() {
// 	//About_us::create_view('about_us');
// });

// Route::set('contact-us', function() {
// 	Contact_us::create_view('contact_us');
// });