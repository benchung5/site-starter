<?php
namespace Lib;

class Utils
{
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

	//*****replace later
	public static function validateParameter($fieldName, $value, $dataType, $required = true) 
	{
		if($required == true && empty($value) == true) {
			self::json_respond_error(VALIDATE_PARAMETER_REQUIRED, $fieldName . " parameter is required.");
		}

		switch ($dataType) {
			case BOOLEAN:
				if(!is_bool($value)) {
					self::json_respond_error(VALIDATE_PARAMETER_DATATYPE, "Datatype is not valid for " . $fieldName . '. It should be boolean.');
				}
				break;
			case INTEGER:
				if(!is_numeric($value)) {
					self::json_respond_error(VALIDATE_PARAMETER_DATATYPE, "Datatype is not valid for " . $fieldName . '. It should be numeric.');
				}
				break;

			case STRING:
				if(!is_string($value)) {
					self::json_respond_error(VALIDATE_PARAMETER_DATATYPE, "Datatype is not valid for " . $fieldName . '. It should be string.');
				}
				break;
			
			default:
				self::json_respond_error(VALIDATE_PARAMETER_DATATYPE, "Datatype is not valid for " . $fieldName);
				break;
		}

		return $value;
	}
}