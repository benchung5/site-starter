<?php
namespace Controllers;
use Lib\Controller;

class Shipping extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index($param = null) {
		$this->render('shipping', null, 'Shipping - Nature With Us', '
			We ship native and medicinal seeds and seedling plants to BC and Alberta, Canada');
	}
}