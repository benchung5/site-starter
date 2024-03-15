<?php

use Lib\Model;
use Lib\Utils;

class Payment_transactions_model extends Model
{
	public function __construct() {
		parent::__construct();
	}

	public function add($data)
	{
		if (is_array($data)) {
			// $ins = ['article_id' => $article_id, $table_id_name => $id];
			// $this->db->table($join_table_name)->insert($ins);
			
			$this->db->table('payment_transactions')->insert($data);

			$new_transaction_id = $this->db->insertId();

			return $new_transaction_id;
		}

		return false;
	}
}