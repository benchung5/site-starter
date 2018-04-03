<?php

class Controller {
	public static function create_view($view_name) 
	{
		require_once('./views/'.$view_name.'.php');
	}
}