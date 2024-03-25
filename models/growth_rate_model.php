<?php

use Lib\Model;
use Lib\Utils;

class Growth_rate_model extends Model
{
	public $options;

	public function __construct() {
		parent::__construct();

		$fast = new \stdClass();
		$fast->id = 'fast';
		$fast->name = 'fast';
		$medium = new \stdClass();
		$medium->id = 'medium';
		$medium->name = 'medium';
		$slow = new \stdClass();
		$slow->id = 'slow';
		$slow->name = 'slow';
		$this->growth_rate = [$fast, $medium, $slow];
	}

	public function get_all($opts = []) 
	{
		return $this->growth_rate;
	}
}