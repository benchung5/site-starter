<?php
namespace Config;

class Config 
{
	private static $paths_config = [
	    'ROOT_URL' => '/',
	    'CONTROLLER_PATH' => './controllers/',
	    'VIEW_PATH' => './views/',
	    'MODEL_PATH' => './models/',
	    'SIGNIN_KEY' => 'sQPMBNCVkgs"f?>$%^*fgbfgbdSfds###$%#$bdFp%upsfbdf',
	    'ADMIN_ID' => '752',
	    'COMPANY_POSTAL_CODE' => 'V2N6A2',
	];

	private static $company_info_config = [
	    'COMPANY_POSTAL_CODE' => 'V2N6A2',
	];

	public static function paths($key = null) {
		return self::$paths_config[$key];
	}

	public static function company_info($key = null) {
		return self::$company_info_config[$key];
	}

	public static function define_constants()
	{
		/*site title*/
		define('SITE_TITLE', 'Northern Wild Seeds | Nature With Us');
		define('SITE_DESCRIPTION', 'Order native tree, plant, and wildflower seeds + seedlings. Located in northern BC, we sell online to wild plant enthusiasts and restoration companies.');

		/*Security*/
		define('SECRETE_KEY', 'test123');

		/*Data Type*/
		define('BOOLEAN', 	'1');
		define('INTEGER', 	'2');
		define('STRING', 	'3');

		/*Error Codes*/
		define('REQUEST_METHOD_NOT_VALID',		        100);
		define('REQUEST_CONTENTTYPE_NOT_VALID',	        101);
		define('REQUEST_NOT_VALID', 			        102);
		define('VALIDATE_PARAMETER_REQUIRED', 			103);
		define('VALIDATE_PARAMETER_DATATYPE', 			104);
		define('API_NAME_REQUIRED', 					105);
		define('API_PARAM_REQUIRED', 					106);
		define('API_DOST_NOT_EXIST', 					107);
		define('INVALID_USER_PASS', 					108);
		define('USER_NOT_ACTIVE', 						109);

		define('SUCCESS_RESPONSE', 						200);

		/*Server Errors*/
		define('JWT_PROCESSING_ERROR',					300);
		define('ATHORIZATION_HEADER_NOT_FOUND',			301);
		define('ACCESS_TOKEN_ERRORS',					302);
		define('INTERNAL_ERROR',					500);

		//global functions
	}
}
