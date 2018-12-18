<?php
use Lib\Model;
use Lib\Utils;

class Files_model extends Model
{
	public $options;

	public function __construct() {
		parent::__construct();
	}

	public function get($opts = []) 
	{
		// $this->db->table('files')->select('*');

		// if (isset($opts['id'])) {
		// 	$this->db->where('id', '=', $opts['id']);
		// }

		// if (isset($opts['slug'])) {
		// 	$this->db->where('slug', '=', $opts['slug']);
		// }

		// $result = $this->db->get();
		
		// return $result;
	}

	public function add($data)
	{
		if (is_array($data)) {

			$this->db->table('files')->insert($data);

			return $this->db->insertId();
		}
	}

	public function remove($opts = []) 
	{
		// $this->db->table('files');

		// if (isset($opts['id'])) {
		// 	$this->db->where('id', '=', $opts['id']);
		// }

		// if (isset($opts['slug'])) {
		// 	$this->db->where('slug', '=', $opts['slug']);
		// }

		// if ($opts) {
		// 	$this->db->delete();
		// }
	}

	public function get_all($opts = []) 
	{
		// $this->db->table('files');

		// if (isset($opts)) {
		// 	$this->db->select(implode(',', $opts));
		// } else {
		// 	$this->db->select('*');
		// }

		// $result = $this->db->getAll();
		// return $result;
	}

	public function update_associations($ref_type, $ref_id, $deleted_images) 
	{
		$deleted_images = is_array($deleted_images) ?: explode(',', $deleted_images); 

		// compare new image associations with existing ones and adjust
		foreach ($deleted_images as $deleted_image) {
			$this->db->table('files')
				->where('ref_id', (int)$ref_id)
				->where('name', $deleted_image)
				->delete();

			//also remove the actual uploaded files
			$path = realpath('./uploads');
			if (is_dir($path.'/'.$ref_type)) {
				$deleted_image_sml = preg_replace('/(\.[\w\d_-]+)$/i', '-sml$1', $deleted_image);
				$deleted_image_med = preg_replace('/(\.[\w\d_-]+)$/i', '-med$1', $deleted_image);
				unlink($path.'/'.$ref_type.'/'.$deleted_image);
				unlink($path.'/'.$ref_type.'/'.$deleted_image_sml);
				unlink($path.'/'.$ref_type.'/'.$deleted_image_med);
			}
		}
	}

	public function update($opts = []) 
	{
		if (isset($opts['where']) && isset($opts['update'])) {
			$this->db->table('files');
			$this->db->where($opts['where'])->update($opts['update']);
		}
	}
}