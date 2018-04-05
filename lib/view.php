<?php

class View {
	public static function render($view_name)
	{
		require_once('./views/'.$view_name.'.php');

		//optional call to function on object that
		//extends from this controller.
		//static::doSomething();
	}
}