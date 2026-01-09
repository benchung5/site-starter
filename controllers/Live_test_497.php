<?php
namespace Controllers;
use Lib\Controller;
use Lib\Utils;
use Lib\Send_email;

//send email
use Config\Secret;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\OAuth;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use League\OAuth2\Client\Provider\Google;


class Live_test_497 extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index() 
	{
		// Test email sending using the Send_email class
		$test_email = isset($_GET['email']) ? $_GET['email'] : 'info@naturewithus.com';
		
		echo "<h1>Testing Email Sending</h1>";
		echo "<p>Attempting to send test email to: <strong>{$test_email}</strong></p>";
		echo "<hr>";
		
		try {
			$subject = 'Test Email - Newsletter Subscription';
			$body = 'This is a test email to verify that email sending is working correctly.<br><br>'.
				'If you receive this email, the OAuth token is working properly.<br><br>'.
				'Time: ' . date('Y-m-d H:i:s');
			
			$result = Send_email::send($test_email, $subject, $body);
			
			echo "<p style='color: green;'><strong>Email send attempt completed.</strong></p>";
			echo "<p>Result: " . htmlspecialchars($result) . "</p>";
			echo "<p>Check your inbox at: <strong>{$test_email}</strong></p>";
			echo "<p>Note: The email is also sent to info@naturewithus.com automatically.</p>";
			
		} catch (\Exception $e) {
			echo "<p style='color: red;'><strong>Error occurred:</strong></p>";
			echo "<p>" . htmlspecialchars($e->getMessage()) . "</p>";
		} catch (\Throwable $e) {
			echo "<p style='color: red;'><strong>Error occurred:</strong></p>";
			echo "<p>" . htmlspecialchars($e->getMessage()) . "</p>";
		}
		
		echo "<hr>";
		echo "<p><a href='?email={$test_email}'>Test Again</a> | <a href='?email=info@naturewithus.com'>Test with info@naturewithus.com</a></p>";
	}

}