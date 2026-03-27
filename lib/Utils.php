<?php
namespace Lib;
use Config\Config;

class Utils
{
	public function __construct() {
		// parent::__construct();
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

	public static function html_respond($code, $data)
	{
		header("content-type: text/html");
		header('Status: '.$code);
		$response = $data;
		echo $response; exit;
	}

	public static function json_respond_error($code, $message) 
	{
		header('Status: '.$code);
		http_response_code(500);
		$response = json_encode(['error' => $message]);
		echo $response; exit;
	}

	public static function sanitize($str) 
	{
		$str = htmlspecialchars($str, ENT_QUOTES, 'UTF-8');

		return $str;
	}

	/**
	 * Rich HTML from CMS fields: allow a safe subset of tags, strip scripts/event handlers,
	 * and block dangerous href/src protocols.
	 */
	public static function sanitizeRichHtml($str)
	{
		if ($str === null || $str === '') {
			return '';
		}
		$allowed = '<p><br><blockquote><strong><b><em><i><u><a><ul><ol><li><h1><h2><h3><h4><h5><h6>'
			. '<span><div><table><thead><tbody><tr><th><td><sup><sub><hr><figure><figcaption><img>';
		$html = strip_tags((string) $str, $allowed);
		$html = preg_replace('/\s+on\w+\s*=\s*(["\']).*?\1/i', '', $html);
		$html = preg_replace('/\s+on\w+\s*=\s*[^\s>]*/i', '', $html);
		$html = preg_replace_callback(
			'#\b(href|src)\s*=\s*([\'"])(.*?)\2#i',
			function ($m) {
				$url = trim($m[3]);
				if ($url !== '' && preg_match('#^(javascript|data|vbscript):#i', $url)) {
					return $m[1] . '=' . $m[2] . '#' . $m[2];
				}
				return $m[0];
			},
			$html
		);
		return $html;
	}

	/**
	 * Usage / growing text fields: sanitize HTML when the stored value contains tags;
	 * otherwise escape and preserve line breaks (legacy plain text).
	 */
	public static function formatUsageHtml($str)
	{
		if ($str === null || $str === '') {
			return '';
		}
		$str = (string) $str;
		if (preg_match('/<[a-z][\s\S]*>/i', $str)) {
			return self::sanitizeRichHtml($str);
		}
		return nl2br(htmlspecialchars($str, ENT_QUOTES, 'UTF-8'));
	}

	public static function dbug($data) 
	{
		$dir = 'from: '.debug_backtrace()[0]['file'];

		//Something to write to txt log
		$log  = print_r($data, true).PHP_EOL.
		        '-----------------------------------------------'.PHP_EOL.
		        print_r($dir, true).PHP_EOL.
		        '-----------------------------------------------'.PHP_EOL;
		//Save string to log, use FILE_APPEND to append.
		file_put_contents('./log/debug_log.log', $log, FILE_APPEND);	
		//chmod('./log/debug_log.log', 0777);
	}
}