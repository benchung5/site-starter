<?php
namespace Controllers;
use Lib\Controller;
use Lib\Utils;
use Lib\Process_shipment;

class Shipment extends Controller 
{
	public function __construct() 
	{
		$this->orders = $this->load_model('orders_model');

		parent::__construct();
	}

	public function download_shipping_label($order_number)
	{
		$order = $this->orders->get(['id' => $order_number]);
		$shipment_info = Process_shipment::create_shipment($order);
		Process_shipment::print_label($shipment_info);
	}

}