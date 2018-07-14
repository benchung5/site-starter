<?php
namespace Controllers;
use Lib\Controller;

use Lib\Validation\Validator;

class Index extends Controller 
{
	public function __construct() 
	{
		$this->load_script('controllers/login.js');
	}

	public function index($param = null) {
		// Set a default value for each form field (blank)
		$name = '';
		$zip = '';
		$state = '---';
		$month = '---';
		$year = '---';


		$validator = new Validator();

		/* 
		 * Add validation rules (fieldname, error msg, rule type, criteria)
		 * A field can have multiple rules and will validate them in the order they
		 * are provided
		 */
		$validator->addRule('name', 'Name is a required field', 'required');
		$validator->addRule('name', 'Name must be longer than 2 characters', 'minlength', 2);
		$validator->addRule('zip', 'Zip Code is a required field', 'required');
		$validator->addRule('zip', 'Invalid Zip Code', 'zip');

		$validator->validate();

		    $validator->validate();
	   
	    // Retrieve an associative array of "sanitized" form inputs (HTML tags stripped, etc.)
	    $entries = $validator->getEntries();
	    
	    // Replace the default field values with what the user submitted
	    foreach ($entries as $key => $value) {
	        //${$key} = $value;
	    }
	    
	    /* 
	     * Conditional logic can be used based on whether errors were found
	     * e.g. redirecting to a different page on success
	     */
	    if ($validator->foundErrors()) {
	        $errors = $validator->getErrors();
	        print_r($errors);
	    }


		// //get data from db
		// $model = $this->load_model('model_sample');
		
		// //pass view data to view
		// $this->render('index');
	}
}