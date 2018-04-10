<?php

class Config 
{
	private static $config = [
	    'ROOT_URL' => '/1pix_app/',
	    'CONTROLLER_PATH' => './controllers/',
	    'VIEW_PATH' => './views/',
	    'MODEL_PATH' => './models/',
	];

	public static function paths($key = null) {
		return self::$config[$key];
	}
}

