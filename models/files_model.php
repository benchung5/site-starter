<?php
use Lib\Model;
use Lib\Utils;
use Lib\Upload;

class Files_model extends Model
{
	public $options;

	public function __construct() {
		parent::__construct();
	}

	// public function get_all_by_ref_id($ref_id, $opts = [], $isCount = false) 
	// {
	// 	$this->db->table('files f');

	// 	if ($isCount) {
	// 		 $this->db->select('DISTINCT f.id');

	// 		 $result = $this->db->getAll();

	// 		return count($result);
	// 	} else {
	// 		if (isset($opts['select'])) {
	// 			$this->db->select(implode(',', $opts['select']));
	// 		} else {
	// 			$this->db->select('DISTINCT f.id, f.ref_id, f.name, f.sort_order, f.extension, tf.name AS tag_name, f.description');
	// 		}

	// 		$this->db->leftJoin('tags_files tf','tf.id','f.tag_id');
	// 		$this->db->where('ref_id', $ref_id);

	// 		$result = $this->db->getAll();

	// 		return $result;
	// 	}
	// }

	public function add($data)
	{
		if (is_array($data)) {

			$this->db->table('files')->insert($data);

			return $this->db->insertId();
		}
	}

	public function update_associations($deleted_images) 
	{
		// delete specific files and their uploads
		foreach ($deleted_images as $deleted_image) {

			$this->db->table('files')
				->where('name', $deleted_image)
				->delete();
		}

		//repove the actual uploads
		Upload::remove('articles', $deleted_images);
	}

	public function remove_associations($id) 
	{
		//remove all files and their uploads used by an article
		$articles = $this->load_model('articles_model');
		$article = $articles->get(['id' => $id]);
		$uploads = [];
		
		if (!empty($article->images)) {
			foreach ($article->images AS $image) {
				//remove the files
				$this->db->table('files')
					->where('id', $image->id)
					->delete();

				$uploads[] = $image->name;
			}

			//remove the actual uploads
			Upload::remove('articles', $uploads);
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