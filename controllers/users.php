<?php 
namespace Controllers;
use Lib\Controller;
use Lib\Auth\Auth;
use Lib\Utils;


class Users extends Controller 
{
	protected $userId;

	public function __construct() 
	{
		parent::__construct();
	}

	public function index()
	{

	}

	public function verify() 
	{
		$users = $this->load_model('Users_model');

		$data = Utils::json_read();

		try {
			$payload = Auth::validateToken();

			$user = $users->get_user(['id' => $data['id']]);

			if (! $user) {
				Utils::json_respond(INVALID_USER_PASS, "This user is not found in our database.");
			} else if ( $user['active'] == 0 ) {
				Utils::json_respond(USER_NOT_ACTIVE, "This user is decactived.");
			}
			
			Utils::json_respond(SUCCESS_RESPONSE, $user);
		} catch (Exception $e) {
			Utils::json_respond_error(ACCESS_TOKEN_ERRORS, $e->getMessage());
		}
	}

	public function sign_in()
	{
		$users = $this->load_model('Users_model');

		$data = Utils::json_read();

		$email = Utils::validateParameter('email', $data['email'], STRING);
		$password = Utils::validateParameter('pass', $data['password'], STRING);
		try {
			$user = $users->get_user(['email' => $email, 'password' => $password]);
			
			if (! $user) {
				Utils::json_respond(INVALID_USER_PASS, "Email or Password is incorrect.");
			} else if ($user->active == 0) {
				Utils::json_respond(USER_NOT_ACTIVE, "User is not activated. Please contact to admin.");
			}

			$data = Auth::generateToken($user->id);

			Utils::json_respond(SUCCESS_RESPONSE, $data);
		} catch (Exception $e) {
			Utils::json_respond_error(JWT_PROCESSING_ERROR, $e->getMessage());
		}

		Auth::generateToken();
	}

	public function create()
	{

	}
}