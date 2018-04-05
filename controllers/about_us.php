<?php
include_once('./lib/controller.php');

class About_us extends Controller 
{
	public function __construct() 
	{
		print_r(DB::query("SELECT * FROM vehicles"));
		print_r('initiated!!!');
	}

}