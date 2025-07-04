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

	public function download_shipping_label()
	{
		$data = Utils::read_post();
		$order = $this->orders->get(['id' => $data['order_id']]);
		$shipment_info = Process_shipment::create_shipment($order, $data);
		Process_shipment::print_label($shipment_info);
	}

}