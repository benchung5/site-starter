<?php 
namespace Controllers\Api;
use Lib\Controller;
use Lib\Utils;


class Tree_tables extends Controller 
{
	protected $origins = null;

	public function __construct() 
	{
		$this->origins = $this->load_model('origins_model');
		$this->eco_benefits = $this->load_model('eco_benefits_model');
		$this->native_to = $this->load_model('native_to_model');
		$this->zones = $this->load_model('zones_model');
		$this->tree_categories = $this->load_model('trees_category_model');
		$this->genuses = $this->load_model('genuses_model');
		$this->tags = $this->load_model('tags_files_trees_model');
		$this->shapes = $this->load_model('shapes_model');
		$this->light = $this->load_model('light_model');
		$this->soil = $this->load_model('soil_model');
		$this->natural_habitat = $this->load_model('natural_habitat_model');
		$this->common_uses = $this->load_model('common_uses_model');
		$this->transplanting = $this->load_model('transplanting_model');
		$this->unique_attractions = $this->load_model('unique_attractions_model');
		$this->tolerances = $this->load_model('tolerances_model');
		$this->reproduction_types = $this->load_model('reproduction_types_model');
		$this->dormancy_treatments = $this->load_model('dormancy_treatments_model');
		$this->tastes = $this->load_model('tastes_model');
		$this->organ_systems = $this->load_model('organ_systems_model');
		$this->thermal_nature = $this->load_model('thermal_nature_model');
		$this->moisture = $this->load_model('moisture_model');
		$this->parts_used = $this->load_model('parts_used_model');
		$this->preparations = $this->load_model('preparations_model');
		$this->organs_and_tissue = $this->load_model('organs_and_tissue_model');
		// $this->insects = $this->load_model('insects_model');
		// $this->diseases = $this->load_model('diseases_model');
		$this->growth_rate = $this->load_model('growth_rate_model');
		$this->mode = $this->load_model('mode_model');

		parent::__construct();
	}

	public function index()
	{

	}

	public function all() 
	{
		$tree_tables = [];

		$tree_tables = [
			'origins' => $this->origins->get_all() ?: [],
			'eco_benefits' => $this->eco_benefits->get_all() ?: [],
			'native_to' => $this->native_to->get_all() ?: [],
			'zone_id' => $this->zones->get_all() ?: [],
			'trees_category_id' =>  $this->tree_categories->get_all() ?: [],
			'genus_id' => $this->genuses->get_all() ?: [],
			'tags' => $this->tags->get_all() ?: [],
			'shapes' => $this->shapes->get_all() ?: [],
			'light' => $this->light->get_all() ?: [],
			'soil' => $this->soil->get_all() ?: [],
			'natural_habitat' => $this->natural_habitat->get_all() ?: [],
			'common_uses' => $this->common_uses->get_all() ?: [],
			'transplanting' => $this->transplanting->get_all() ?: [],
			'unique_attractions' => $this->unique_attractions->get_all() ?: [],
			'tolerances' => $this->tolerances->get_all() ?: [],
			'reproduction_type_id' => $this->reproduction_types->get_all() ?: [],
			'dormancy_treatment_id' => $this->dormancy_treatments->get_all() ?: [],
			'tastes' => $this->tastes->get_all() ?: [],
			'organ_systems' => $this->organ_systems->get_all() ?: [],
			'thermal_nature' => $this->thermal_nature->get_all() ?: [],
			'moisture' => $this->moisture->get_all() ?: [],
			'parts_used' => $this->parts_used->get_all() ?: [],
			'preparations' => $this->preparations->get_all() ?: [],
			'organs_and_tissue' => $this->organs_and_tissue->get_all() ?: [],
			// 'insects' => $this->insects->get_all() ?: [],
			// 'diseases' => $this->diseases->get_all() ?: [],
			'growth_rate' => $this->growth_rate->get_all() ?: [],
			'mode_id' => $this->mode->get_all() ?: [],
		];

		Utils::json_respond(SUCCESS_RESPONSE, $tree_tables);
	}
}