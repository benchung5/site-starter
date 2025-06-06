<?php
namespace Lib;
use Config\Config;
use Lib\Model;
use Lib\Controller;
use Lib\Utils;

class Calc_payment
{
	public static function calc_shipping($order) {
		// calc shipping
		$seeds = [];
		$plants = [];
		$shipping_cost = 0;
		if ($order['pickup'] !== 'yes') {

			foreach ($order['products'] as $product) {
				// calc shipping
				if ($product['productTypeName'] == 'Seeds') {
					$seeds[] = $product;
				}
				if ($product['productTypeName'] == 'Plants') {
					$plants[] = $product;
				}
			}

			$seeds_count = count($seeds);
			$plants_count = count($plants);

			if ($seeds_count >= 1 && $seeds_count <= 5) {
				$shipping_cost = 125;
			} elseif ($seeds_count >= 6 && $seeds_count <= 20) {
				$shipping_cost = 500;
			}
		}

		return intval($shipping_cost);
	}

	public static function calc_tax($order) {
		// calc tax
		// Alberta: 5% GST, BC: 7% PST + 5% GST
		$total = 0;
		$tax = 0;
		foreach ($order['products'] as $product) {
			$subtotal = $product['price'] * $product['quantity'];
			$total = $subtotal + $total;
		}

		if (($order['address']['state'] == 'QC')) {
			$tax = $total * 0.14975;
		}

		if (($order['address']['state'] == 'ON')) {
			$tax = $total * 0.13;
		}

		if (($order['address']['state'] == 'SK')) {
			$tax = $total * 0.11;
		}

		if (($order['address']['state'] == 'BC') || ($order['address']['state'] == 'MB')) {
			// $tax = $total * 0.12;
			$tax = $total * 0.05;
		}

		if (($order['address']['state'] == 'AB') || ($order['address']['state'] == 'NT') || ($order['address']['state'] == 'NU') || ($order['address']['state'] == 'YT')) {
			$tax = $total * 0.05;
		}

		if (($order['address']['state'] == 'NB') || ($order['address']['state'] == 'NL') || ($order['address']['state'] == 'NS') || ($order['address']['state'] == 'PE')) {
			$tax = $total * 0.15;
		}

		return intval($tax);
	}

	public static function calc_subtotal($order) {
		$total = 0;
		foreach ($order['products'] as $product) {
			$subtotal = $product['price'] * $product['quantity'];
			$total = $subtotal + $total;
		}

		return $total;
	}

	public static function verify_products($order) {

		$products_model = Controller::load_model('products_model');
		
		$valid = true;

		foreach ($order['products'] as $product) {
			$existing_product = $products_model->get(['id' => $product['id']]);

			if (!$existing_product) {
				$valid = false;
			} else {
				if ($product['quantity'] > $existing_product->amount_available) {
					$valid = false;
				}

				if (intval($product['price']) !== $existing_product->price) {
					$valid = false;
				}
			}
		}

		return $valid;
	}

}