<?php
namespace Controllers;
use Lib\Controller;

class Website_guidelines extends Controller
{
	public function __construct()
	{
		parent::__construct();
	}

	public function index($param = null)
	{
		$this->render(
			'website_guidelines',
			null,
			'Website Guidelines - Nature With Us',
			'Guidelines for using the Nature With Us website and general guidance around plant and herbal information shared on this site.'
		);
	}
}

