<?php
include_once('./lib/controller.php');

class About_us extends Controller 
{
	public function __construct() 
	{
		//print_r(DB::query("SELECT * FROM vehicles"));
	}

	public function index($param = null) {
		$view_data = ['url param'=>$param];
		$this->render('about_us', $view_data );
	}

}