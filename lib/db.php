<?php
namespace Lib;
use Lib\pdox\Pdox as Pdox;

class Db 
{
    public static $db_config = [
        'host'      => 'localhost',
        //'host'      => '127.0.0.1',
        'driver'    => 'mysql',
        //'database'  => '1pixel_db',
        'database'  => 'test1_db',
        'username'  => 'root',
        'password'  => '',
        'charset'   => 'utf8',
        'collation' => 'utf8_general_ci',
        'prefix'     => ''
    ];

    public function connect() {
        return new Pdox(self::$db_config);
    }
}