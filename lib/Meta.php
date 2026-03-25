<?php
namespace Lib;

class Meta
{
	protected static $page_title = '';
	protected static $description = '';
	protected static $canonical_url = '';

	public function __construct() {
	}

	public static function set_canonical_url($url) {
		self::$canonical_url = $url;
	}

	public static function get_canonical_url() {
		return self::$canonical_url;
	}

	public static function set_page_title($title) {
		self::$page_title = $title . ' | ' . SITE_TITLE;
	}

	public static function get_page_title() 
	{
		return self::$page_title;
	}

	public static function set_page_description($description) {
		self::$description = $description;
	}

	public static function get_page_description() 
	{
		return self::$description;
	}
}