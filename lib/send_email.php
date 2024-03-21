<?php
namespace Lib;
use Config\Secret;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


class Send_email
{
	public function __construct() 
	{
		// parent::__construct();
	}

	public static function send($email_to = '', $subject = '', $message = '') 
	{
		try {
			$email_from = 'info@naturewithus.com';
			$error_message = "";
			$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

			if(!preg_match($email_exp,$email_to)) {
				$error_message .= 'The Email Address does not appear to be valid.<br />';
			}

			if(strlen($error_message) > 0) {
				echo "Message could not be sent. Mailer Error: {$error_message}";
				Utils::dbug($error_message);
				die();
			}

			//use PHPMailer
			// OAuth 2.0 Client IDs
			// https://console.cloud.google.com/apis/credentials/oauthclient/
			$mail = new PHPMailer();

			$name = 'customer name';

			$mail = new PHPMailer(true);

			// Comment the following lines of code till $mail->Port to send
			// mail using phpmail instead of smtp.
			$mail->isSMTP();
			//Enable SMTP debugging
			//SMTP::DEBUG_OFF = off (for production use)
			//SMTP::DEBUG_CLIENT = client messages
			//SMTP::DEBUG_SERVER = client and server messages
			$mail->SMTPDebug = SMTP::DEBUG_OFF;

			//Set the hostname of the mail server
			$mail->Host = 'smtp.gmail.com';

			//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
			$mail->Port = 587;

			//Set the encryption mechanism to use - STARTTLS or SMTPS
			$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

			//Whether to use SMTP authentication
			$mail->SMTPAuth = true;

			//Set AuthType to use XOAUTH2
			$mail->AuthType = 'XOAUTH2';

			//Fill in authentication details here
			//Either the gmail account owner, or the user that gave consent
			$oauthUserEmail = Secret::keys('OAUTH_USER_EMAIL');
			$clientId = Secret::keys('OAUTH_CLIENT_ID');
			$clientSecret = Secret::keys('OAUTH_SECRET_KEY');

			//Obtained by configuring and running get_oauth_token.php
			//after setting up an app in Google Developer Console.
			$refreshToken = Secret::keys('REFRESH_TOKEN');

			//Create a new OAuth2 provider instance
			$provider = new Google(
			    [
			        'clientId' => $clientId,
			        'clientSecret' => $clientSecret,
			    ]
			    );

			//Pass the OAuth provider instance to PHPMailer
			$mail->setOAuth(
			    new OAuth(
			        [
			            'provider' => $provider,
			            'clientId' => $clientId,
			            'clientSecret' => $clientSecret,
			            'refreshToken' => $refreshToken,
			            'userName' => $oauthUserEmail,
			        ]
			        )
			    );

			// Recipients
			$mail->setFrom($email_from, $name);
			$mail->addReplyTo($email_to, $name);

			$mail->addAddress($email_to, $email_to);

			$mail->Subject = $subject;

			$mail->CharSet = PHPMailer::CHARSET_UTF8;
			$mail->msgHTML($message);

			//Replace the plain text body with one created manually
			$mail->AltBody = 'This is a plain-text message body';

			if (!$mail->send()) {
			    //$output = json_encode(array('type'=>'error', 'text' => '<b>'.$from.'</b> is invalid.'));
			    $output = json_encode(array('type'=>'error', 'text' => 'Server error. Please mail info@nature.com'));
			    Utils::dbug('did not send');
			} else {
			    $output = json_encode(array('type'=>'message', 'text' => 'Email sent successfully.'));
			}
			return $output;


			// //can only set this to true when using this on local host
			// $mail->isSMTP();
			// $mail->SMTPDebug = SMTP::DEBUG_SERVER;
			// $mail->Host = 'smtp.gmail.com';
			// //Set the encryption mechanism to use - STARTTLS or SMTPS
			// $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
			// $mail->SMTPAuth = true;
			
			// $mail->SMTPSecure = 'ssl';
			// $mail->Port = 587;
			// $mail->isHTML();
			// $mail->Username = 'info@naturewithus.com';
			// $mail->Password = Secret::keys('GMAIL_PASS');
			 
			// $mail->SetFrom($email_from);
			// $mail->Subject = $subject;
			// $mail->Body = $message;
			// $mail->AddAddress($email_to);

			// $mail->send();

		} catch (Exception $e) {
			echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
			Utils::dbug($mail->ErrorInfo);
			die();
		}
	}
}