<?php
namespace Config;

class Secret 
{
	private static $config = [
	    'GMAIL_PASS' => 'Sme1ephant',
	];

	public static function keys($key = null) {
		return self::$config[$key];
	}

}
