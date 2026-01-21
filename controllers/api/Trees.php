<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;
use Lib\Upload;


class Trees extends Controller 
{
	protected $trees = null;

	public function __construct() 
	{
		$this->trees = $this->load_model('trees_model');
		$this->files = $this->load_model('files_trees_model');

		parent::__construct();
	}

	public function index()
	{

	}

	public function create()
	{
		//handle posted input
		$data = Utils::read_post();

		try {
			$new_tree = $this->update_tree($data, true);

			Utils::json_respond(SUCCESS_RESPONSE, $new_tree);
		} catch (Exception $e) {
			Utils::json_respond('Could not create tree', $e->getMessage());
		}
	}

	public function update() 
	{
		$data = Utils::read_post();

		try {
			$this->update_tree($data, false);

			Utils::json_respond(SUCCESS_RESPONSE, $data);	
		} catch (Exception $e) {
			Utils::json_respond(JWT_PROCESSING_ERROR, $e->getMessage());
		}		
	}

	protected function update_tree($data, $is_add) 
	{
		$this->validator->addEntries(['slug' => $data['slug']]);
		$this->validator->addRule('slug', 'Must be a valid slug', 'slug');
		$this->validator->validate();

		if ($this->validator->foundErrors()) {
		    $errors = $this->validator->getErrors();
		    Utils::json_respond(VALIDATE_PARAMETER_DATATYPE, implode(', ', $errors));
		}

		//'add' or 'update'
		//use isset version for optional fields
		$update_data = [
			'common_name' => $data['common_name'],
			'slug' => $data['slug']
		];

		if(isset($data['other_common_names'])) { $update_data['other_common_names'] = $data['other_common_names']; };
		if(isset($data['genus_id'])) { $update_data['genus_id'] = $data['genus_id']; };
		if(isset($data['specific_epithet'])) { $update_data['specific_epithet'] = $data['specific_epithet']; };
		if(isset($data['other_species'])) { $update_data['other_species'] = $data['other_species']; };
		if(isset($data['subspecies'])) { $update_data['subspecies'] = $data['subspecies']; };
		if(isset($data['variety'])) { $update_data['variety'] = $data['variety']; };
		if(isset($data['cultivar'])) { $update_data['cultivar'] = $data['cultivar']; };
		if(isset($data['zone_id'])) { $update_data['zone_id'] = $data['zone_id']; };
		if(isset($data['reproduction_type_id'])) { $update_data['reproduction_type_id'] = $data['reproduction_type_id']; };
		if(!empty($data['height_min'])) { $update_data['height_min'] = $data['height_min']; };
		if(!empty($data['height_max'])) { $update_data['height_max'] = $data['height_max']; };
		if(!empty($data['width_min'])) { $update_data['width_min'] = $data['width_min']; };
		if(!empty($data['width_max'])) { $update_data['width_max'] = $data['width_max']; };
		if(!empty($data['growth_rate'])) { $update_data['growth_rate'] = $data['growth_rate']; };
		if(!empty($data['lifespan_min'])) { $update_data['lifespan_min'] = $data['lifespan_min']; };
		if(!empty($data['lifespan_max'])) { $update_data['lifespan_max'] = $data['lifespan_max']; };
		if(!empty($data['seeds_packet'])) { $update_data['seeds_packet'] = $data['seeds_packet']; };
		if(!empty($data['seeds_gram'])) { $update_data['seeds_gram'] = $data['seeds_gram']; };
		if(!empty($data['cost_gram'])) { $update_data['cost_gram'] = $data['cost_gram']; };
		if(!empty($data['dormancy_treatment_id'])) { $update_data['dormancy_treatment_id'] = $data['dormancy_treatment_id']; };
		if(!empty($data['seeding_instructions'])) { $update_data['seeding_instructions'] = $data['seeding_instructions']; };
		if(isset($data['body'])) { $update_data['body'] = $data['body']; };
		if(!empty($data['mode_id'])) { $update_data['mode_id'] = $data['mode_id']; };
		//if(isset($data['images'])) { $update_data['images'] = $data['images']; };

		// the many to many table data...
		$joins_data = [
			'trees_category_id' => !empty($data['trees_category_id']) ? $data['trees_category_id'] : null,
			'eco_benefits' => !empty($data['eco_benefits']) ? $data['eco_benefits'] : null,
			'native_to' => !empty($data['native_to']) ? $data['native_to'] : null,
			'shapes' => !empty($data['shapes']) ? $data['shapes'] : null,
			'light' => !empty($data['light']) ? $data['light'] : null,
			'soil' => !empty($data['soil']) ? $data['soil'] : null,
			'natural_habitat' => !empty($data['natural_habitat']) ? $data['natural_habitat'] : null,
			'common_uses' => !empty($data['common_uses']) ? $data['common_uses'] : null,
			'transplanting' => !empty($data['transplanting']) ? $data['transplanting'] : null,
			'unique_attractions' => !empty($data['unique_attractions']) ? $data['unique_attractions'] : null,
			'tolerances' => !empty($data['tolerances']) ? $data['tolerances'] : null,
			// 'insects' => !empty($data['insects']) ? $data['insects'] : null,
			// 'diseases' => !empty($data['diseases']) ? $data['diseases'] : null,
		];

		if ($is_add) {
			$insert_data = [
				'insert' => $update_data,
				'joins' => $joins_data
				//'conifer_data' => $conifer_data
			];

			$new_tree_id = $this->trees->add($insert_data);
			$updated_tree = $this->trees->get(['id' => $new_tree_id]);
		} else {
			$this->trees->update([
				'where' => ['id' => $data['tree_id']], 
				'update' => $update_data,
				'joins' => $joins_data
			]);

			$updated_tree = $this->trees->get(['id' => $data['tree_id']]);
		}

		//find out if any images are deleted and delete them
		$original_images = $updated_tree->images;
		$updated_images = isset($data['updated_images']) ? json_decode($data['updated_images']) : [];

		$diff = array_udiff($original_images, $updated_images,
		  function ($obj_a, $obj_b) {
		    return $obj_a->id - $obj_b->id;
		  }
		);
		
		$deleted_images = [];
		if ($diff) {
			foreach ($diff as $image) {
				$deleted_images[] = $image->name;
			}
			// delete original file uploads
			$this->files->update_associations($deleted_images);
		}

		//record new images into the tree if any
		$new_images = Upload::upload('trees', $updated_tree->id, $data);

		if ($new_images) {
			foreach ($new_images as $ni) {
				array_push($updated_images, $ni);
			}
		}

		$this->trees->update([
			'where' => ['id' => $updated_tree->id], 
			'update' => ['images' => json_encode($updated_images, true)]
		]);
		
		return $updated_tree;
	}

	public function delete()
	{
		$data = Utils::json_read();

		// remove file uploads (need to do this before removing the files to get lookup)
		$this->files->remove_associations($data['tree']['id']);

		// remove tree, associations, and files
		$this->trees->remove(['slug' => $data['tree']['slug']]);

		Utils::json_respond(SUCCESS_RESPONSE, $data['tree']['slug']);
	}

	public function all() 
	{
		$trees = $this->trees->get_all();
		if ($trees) {
			Utils::json_respond(SUCCESS_RESPONSE, $trees);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}

	public function single($slug) 
	{
		$tree = $this->trees->get(['slug' => $slug]);
		if ($tree) {
			Utils::json_respond(SUCCESS_RESPONSE, $tree);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, array());
		}
	}

	public function search()
	{
		$data = Utils::read_get();

		// todo: make this like in update_tree
		$opts = [
			'offset' => $data['offset'], 
			'limit' => $data['limit'],
			'like' => isset($data['search']) ? $data['search'] : null, 
			'trees_category' => isset($data['trees_category_id']) ? $data['trees_category_id'] : null, 
			'native_to' => isset($data['native_to']) ? $data['native_to'] : null,
			'mode' => isset($data['mode']) ? $data['mode'] : null,
			'select' => ['t.id', 't.slug', 't.common_name'],
		];

		//just to count the results *without the offset and limit
		$count = $this->trees->get_all($opts, true);

		$trees = $this->trees->get_all($opts);

		$result = ['trees' => $trees, 'count' => $count, 'offset' => (int)$data['offset'], 'limit' => (int)$data['limit']];

		if ($trees) {
			Utils::json_respond(SUCCESS_RESPONSE, $result);
		} else {
			Utils::json_respond(SUCCESS_RESPONSE, ['trees' => [], 'count' => 0, 'offset' => 0, 'limit' => (int)$data['limit']]);
		}		
	}
}