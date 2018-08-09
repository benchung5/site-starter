<?php
namespace Lib;

class Utils
{
	public function __construct() {
		parent::__construct();
	}

	public static function read_get() {
		if($_SERVER['REQUEST_METHOD'] !== 'GET') {
			self::json_respond_error(REQUEST_METHOD_NOT_VALID, 'Request Method is not valid.');
		}

		return $_GET;
	}

	public static function read_post() {
		if($_SERVER['REQUEST_METHOD'] !== 'POST') {
			self::json_respond_error(REQUEST_METHOD_NOT_VALID, 'Request Method is not valid.');
		}

		return $_POST;
	}

	public static function json_read()
	{
		if($_SERVER['REQUEST_METHOD'] !== 'POST') {
			self::json_respond_error(REQUEST_METHOD_NOT_VALID, 'Request Method is not valid.');
		}

		if(($_SERVER['CONTENT_TYPE'] !== 'application/json') && ($_SERVER['CONTENT_TYPE'] !== 'application/json;charset=UTF-8')) {
			self::json_respond_error(REQUEST_CONTENTTYPE_NOT_VALID, 'Request content type is not valid');
		}

		$handler = fopen('php://input', 'r');
		$request = stream_get_contents($handler);
		$data = json_decode($request, true);

		return $data;
	}

	public static function json_respond($code, $data)
	{
		header("content-type: application/json");
		header('Status: '.$code);
		$response = json_encode($data);
		echo $response; exit;
	}

	public static function json_respond_error($code, $message) 
	{
		header("content-type: application/json");
		header('Status: '.$code);
		$errorMsg = json_encode(['error' => $message]);
		echo $errorMsg; exit;
	}

	public static function upload() 
	{
		$destination = realpath('./uploads');
				
		// result info list
		$result = array('error' => false, 'files' => array());
		
		foreach ($_FILES as $field_name => $file) {
			$file_count = is_array($_FILES[$field_name]['error']) ? count($_FILES[$field_name]['error']) : 1;
			
			if ($file_count == 1 && $_FILES[$field_name]['error'] != UPLOAD_ERR_NO_FILE) {
	            // if no errors
				$result['files'][$field_name] = self::upload_transfer($destination, $field_name);
			} elseif ($file_count > 1) {
	            // if multiple errors for the file
				for ($i=0; $i<$file_count; $i++) {
					if ($_FILES[$field_name]['error'][$i] == UPLOAD_ERR_NO_FILE) {
						continue;
					}
					//move to temp folder and return info
					$result['files'][$field_name][$i] = self::upload_transfer($destination, $field_name, $i);
				}
			}
		}
		
		// Check for submitted files
		if (count($result['files']) == 0) {
			$result['error'] = 'No files provided';
		}

	    //add on a hash
	    if (! array_key_exists('hash', $result) || empty($result['hash'])) {
	        $result['hash'] = md5(microtime().print_r($result, true));
	    }

	    //save the file data to the db
	    //$new_id = $this->files->save($data);
	    $new_id = 1;

	    return $result;
	}

	protected function upload_transfer($destination, $field_name, $index = null)
	{
		$result = array(
			'name'		=> ($index == null ? $_FILES[$field_name]['name'] : $_FILES[$field_name]['name'][$index]),
			'type'		=> ($index == null ? $_FILES[$field_name]['type'] : $_FILES[$field_name]['type'][$index]),
			'tmp_name'	=> ($index == null ? $_FILES[$field_name]['tmp_name'] : $_FILES[$field_name]['tmp_name'][$index]),
			'error'		=> ($index == null ? $_FILES[$field_name]['error'] : $_FILES[$field_name]['error'][$index]),
			'size'		=> ($index == null ? $_FILES[$field_name]['size'] : $_FILES[$field_name]['size'][$index])
		);
		
		$filename = basename($result['name']);
		$target = $destination.'/'.$filename;
		
		// move and overrite if exists
		$ok = move_uploaded_file($result['tmp_name'], $target);
		//$ok = @move_uploaded_file($result['tmp_name'], $target);

	    if (! $ok) {
	        $result['error'] = 'unable to move uploaded file';
	    }
		
		return $result;
	}
}