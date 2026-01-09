<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;
use Lib\Send_email;

class Subscribers extends Controller 
{
	protected $subscribers = null;

	public function __construct() 
	{
		$this->subscribers = $this->load_model('subscribers_model');
		parent::__construct();
	}

	public function subscribe()
	{
		// Handle both JSON and form data
		$data = Utils::json_read();
		
		// If JSON read fails, try POST data
		if (!$data && isset($_POST['email'])) {
			$data = ['email' => $_POST['email']];
		}

		if (!isset($data['email']) || empty($data['email'])) {
			Utils::json_respond(VALIDATE_PARAMETER_DATATYPE, 'Email is required.');
			return;
		}

		$email = trim($data['email']);

		// Validate email
		$this->validator->addEntries(['email' => $email]);
		$this->validator->addRule('email', 'Must be a valid email address', 'email');
		$this->validator->validate();

		if ($this->validator->foundErrors()) {
			$errors = $this->validator->getErrors();
			Utils::json_respond(VALIDATE_PARAMETER_DATATYPE, implode(', ', $errors));
			return;
		}

		try {
			$result = $this->subscribers->add_subscriber($email);
			
			if ($result === false) {
				// Check if it's because email already exists
				$existing = $this->subscribers->db->table('subscribers')
					->select('*')
					->where('email', '=', $email)
					->get();
				
				if ($existing) {
					Utils::json_respond(SUCCESS_RESPONSE, ['message' => 'You are already subscribed!', 'already_subscribed' => true]);
				} else {
					Utils::json_respond(VALIDATE_PARAMETER_DATATYPE, 'Failed to subscribe. Please try again.');
				}
			} else {
				// Send success response first (subscription is saved, so user gets success)
				header("content-type: application/json");
				header('Status: ' . SUCCESS_RESPONSE);
				$response_data = json_encode(['message' => 'Thank you for subscribing!', 'id' => $result]);
				echo $response_data;
				
				// Ensure all output is flushed before attempting email
				while (ob_get_level() > 0) {
					ob_end_flush();
				}
				flush();
				
				if (function_exists('fastcgi_finish_request')) {
					fastcgi_finish_request();
				}
				
				// Now send email (if this dies, response already sent)
				$email_subject = 'Thank You for Subscribing - Nature With Us';
				$email_body = 'Thank you for subscribing to our newsletter!<br><br>'.
					'You will now receive updates about our latest products, gardening tips, and special offers.<br><br>'.
					'If you have any questions, please don\'t hesitate to contact us:<br>'.
					'info@naturewithus.com<br>250-981-1324<br><br>'.
					'Best regards,<br>The Nature With Us Team';
				
				// Send email (will also send to info@naturewithus.com automatically)
				Send_email::send($email, $email_subject, $email_body);
			}
		} catch (Exception $e) {
			Utils::json_respond(VALIDATE_PARAMETER_DATATYPE, 'An error occurred. Please try again later.');
		}
	}

	public function all() 
	{
		$subscribers = $this->subscribers->get_all(['active' => 1]);
		if ($subscribers) {
			Utils::json_respond(SUCCESS_RESPONSE, $subscribers);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}
}
