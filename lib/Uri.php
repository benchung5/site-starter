<?php
namespace Lib;
use Config\Config;

class Uri 
{
	public function __construct() {
	}

	public static function get_current_url()
	{
		$protocol = ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
		$url = $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
		return $url; // Outputs: Full URL
	}

	public static function get_current_domain()
	{
		$protocol = ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
		$domain = $protocol . $_SERVER['HTTP_HOST'];
		return $domain; // Outputs: Domain
	}

	private static function _get_current_uri()
	{
	    $basepath = implode('/', array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1)) . '/';
	    $uri = substr($_SERVER['REQUEST_URI'], strlen($basepath));
	    if (strstr($uri, '?')) $uri = substr($uri, 0, strpos($uri, '?'));
	    $uri = trim($uri, '/');
	    return $uri;
	}

	private static function get_segments()
	{
		$base_url = self::_get_current_uri();

		$segments = array();
		$url_array = explode('/', $base_url);

		foreach($url_array as $segment)
		{
		    if(trim($segment) != '')
		        array_push($segments, $segment);
		}

		return $segments;
	}

	public static function get_parts() 
	{
		$segments = self::get_segments();
		$parts = [];

		$index = 0;

		// controller
		if (isset($segments[0]) && is_dir(Config::paths('CONTROLLER_PATH').$segments[0])) {
			$parts['controller_dir'] = $segments[0];
			$index = 1;
		}
		$parts['controller'] = isset($segments[$index]) ? $segments[$index] : 'index';
		$index++;

		//action
		$parts['action'] = isset($segments[$index]) ? $segments[$index] : 'index';

		// action parameters
		$segments = array_slice($segments, $index+1);

		$parts['params'] = (!empty($segments)) ? array_values($segments) : [];

		return $parts;
	}

	/**
	 * Path prefix before routing segments (e.g. /1pix_app when the app lives in a subfolder).
	 */
	private static function get_script_path_prefix()
	{
		$dir = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME']));
		if ($dir === '/' || $dir === '.') {
			return '';
		}
		return $dir;
	}

	/**
	 * 301 redirect when the request has junk path segments (e.g. /article/slug/123) or
	 * tracking query parameters (fbclid, trk, utm_*, gclid, etc.).
	 */
	public static function maybe_redirect_canonical_request()
	{
		$parts = self::get_parts();
		$controller = ucfirst($parts['controller']);

		$pathChanged = false;
		$targetPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';

		if (($controller === 'Articles' || $controller === 'Plants')
			&& !empty($parts['action'])
			&& isset($parts['params'][0])
			&& empty($parts['controller_dir'])
			&& count($parts['params']) > 1) {
			$prefix = self::get_script_path_prefix();
			$suffix = $parts['controller'] . '/' . $parts['action'] . '/' . $parts['params'][0];
			$targetPath = ($prefix === '' ? '' : $prefix) . '/' . $suffix;
			$targetPath = preg_replace('#/+#', '/', $targetPath);
			if ($targetPath === '' || $targetPath[0] !== '/') {
				$targetPath = '/' . ltrim($targetPath, '/');
			}
			$pathChanged = true;
		}

		$cleanGet = $_GET;
		$queryChanged = false;
		$removeKeys = ['fbclid', 'trk', 'gclid', 'msclkid', 'mc_cid', 'mc_eid'];
		foreach ($removeKeys as $k) {
			if (isset($cleanGet[$k])) {
				unset($cleanGet[$k]);
				$queryChanged = true;
			}
		}
		foreach (array_keys($cleanGet) as $k) {
			if (strpos($k, 'utm_') === 0) {
				unset($cleanGet[$k]);
				$queryChanged = true;
			}
		}

		if (!$pathChanged && !$queryChanged) {
			return;
		}

		$targetQuery = http_build_query($cleanGet);
		$targetUrl = self::get_current_domain() . $targetPath;
		if ($targetQuery !== '') {
			$targetUrl .= '?' . $targetQuery;
		}

		if (!self::urls_are_equivalent($targetUrl, self::get_current_url())) {
			header('Location: ' . $targetUrl, true, 301);
			exit;
		}
	}

	private static function urls_are_equivalent($a, $b)
	{
		$pa = parse_url($a);
		$pb = parse_url($b);
		$pathA = $pa['path'] ?? '/';
		$pathB = $pb['path'] ?? '/';
		if (rtrim($pathA, '/') !== rtrim($pathB, '/')) {
			return false;
		}
		parse_str($pa['query'] ?? '', $qa);
		parse_str($pb['query'] ?? '', $qb);
		ksort($qa);
		ksort($qb);
		return $qa === $qb;
	}
}