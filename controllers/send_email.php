<?php
namespace Controllers;
use Lib\Controller;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
// /* Include the Composer generated autoload.php file. */
// // require 'C:\xampp\composer\vendor\autoload.php';
// // require 'path/to/PHPMailer/src/Exception.php';
// require 'vendor\phpmailer\src\PHPMailer.php';
// // require 'path/to/PHPMailer/src/SMTP.php';

class Send_email extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index($param = null) 
	{
		if(isset($_POST['email'])) {

			try {
				    // CHANGE THE TWO LINES BELOW
					$email_to = "info@naturewithus.com";
					$email_subject = "Form submission from natruewithus.com";

				    // validation expected data exists
					if(!isset($_POST['name']) ||
						!isset($_POST['email']) ||
						!isset($_POST['message'])) {
						$this->died('Please fill in all required fields.');       
					}

				    $name = $_POST['name']; // required
				    $email_from = $_POST['email']; // required
				    $message = $_POST['message']; // required

				    $error_message = "";
				    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
				    if(!preg_match($email_exp,$email_from)) {
				    	$error_message .= 'The Email Address you entered does not appear to be valid.<br />';
				    }
				    $string_exp = "/^[A-Za-z .'-]+$/";
				    if(!preg_match($string_exp,$name)) {
				    	$error_message .= 'The First Name you entered does not appear to be valid.<br />';
				    }
				    if(strlen($message) < 2) {
				    	$error_message .= 'The message you entered does not appear to be valid.<br />';
				    }
				    if(strlen($error_message) > 0) {
				    	$this->died($error_message);
				    }
				    $email_message = "Form details below.\n\n";

				    function clean_string($string) {
				    	$bad = array("content-type","bcc:","to:","cc:","href");
				    	return str_replace($bad,"",$string);
				    }

				    $email_message .= "First Name: ".clean_string($name)."\n";
				    $email_message .= "Email: ".clean_string($email_from)."\n";
				    $email_message .= "message: ".clean_string($message)."\n";


					// // create email headers
					 //    $headers = 'From: '.$email_from."\r\n".
					 //    'Reply-To: '.$email_from."\r\n" .
					 //    'X-Mailer: PHP/' . phpversion();
					 //    @mail($email_to, $email_subject, $email_message, $headers);
					 //    //echo mail($email_to, $email_subject, $email_message, $headers);

				    //use PHPMailer
				    $mail = new PHPMailer();

				    //can only set this to true when using this on local host
				    // $mail->isSMTP();
				    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
				    $mail->Host = 'smtp.gmail.com';
				    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
				    $mail->SMTPAuth = true;
				    
				    $mail->SMTPSecure = 'ssl';
				    $mail->Port = 587;
				    $mail->isHTML();
				    $mail->Username = 'info@naturewithus.com';
				    $mail->Password = 'Sme1ephant';
				     
				    $mail->SetFrom($email_from);
				    $mail->Subject = $email_subject;
				    $mail->Body = $email_message;
				    $mail->AddAddress($email_to);

				    $mail->send();


				    $this->render('email_sent');
			} catch (Exception $e) {
				    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
				    $message = "Message could not be sent. Mailer Error: ".$mail->ErrorInfo;
				    $this->died($message);
			}
		}
	}


	protected function died($error) 
	{
        // your error code can go here
		echo "Apologies, but there were error(s) found with the form you submitted. ";
		echo $error."<br /><br />";
		die();
	}

}