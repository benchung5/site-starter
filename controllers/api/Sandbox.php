<?php
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;

class Sandbox extends Controller 
{
	public function __construct() 
	{
		$this->products = $this->load_model('products_model');

		parent::__construct();
	}

	public function get() 
	{
		$products = $this->products->get_all(['status_id' => 2, 'select' => 'CONCAT_WS(" - ",t.common_name, pt.name, ptv.name) Name, CONCAT("$", CAST(p.price/100 AS DECIMAL(10,2))) Price, p.amount_available "Amount Available"']);

		$col_styles = self::style_col_size($products);
		$viewdata = ['output' => ''];
		//only get products that are available
		$viewdata['output'] .= '<div class="data-list">';
		$viewdata['output'] .= '<div class="list-header">';
		$index = 0;
		foreach ($products[0] as $property => $value) {
			$viewdata['output'] .= '<div '.$col_styles[$index].'>';
			$viewdata['output'] .= $property;
			$viewdata['output'] .= '</div>';
			$index++;
		}
		$viewdata['output'] .= '</div>';
				foreach ($products as $product) {
			$viewdata['output'] .= '<div class="list-row">';
			$index = 0;
			foreach ($product as $property => $value) {
				$viewdata['output'] .= '<div '.$col_styles[$index].'>';
				$viewdata['output'] .= $value;
				$viewdata['output'] .= '</div>';
				$index++;
			}
			$viewdata['output'] .= '</div>';
		}
		$viewdata['output'] .= '</div>';

		if ($viewdata) {
			Utils::html_respond(SUCCESS_RESPONSE, $viewdata['output']);
		} else {
			Utils::html_respond(SUCCESS_RESPONSE, 'error retreiving sandbox data');
		}
	}

	private static function style_col_size($list)
	{
		$col_styles = [];
		$index = 0;
		foreach ($list[0] as $property => $value) {
			if (strlen($value) > 20) {
				$col_styles[$index] =  'style="flex: 3"';
			} else if (strlen($value) > 10) {
				$col_styles[$index] =  'style="flex: 2"';
			} else {
				$col_styles[$index] =  'style="flex: 1"';
			}
			$index++;
		}
		return $col_styles;
	}
}