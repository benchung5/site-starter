<?php

use Lib\Model;
use Lib\Utils;

class Trees_model extends Model
{
	public $options;

	public function __construct() {
		parent::__construct();
	}

	public function get($opts = [])
	{
		$this->db->table('trees')->select('*');

		if (isset($opts['id'])) {
			$this->db->where('id', '=', $opts['id']);
		}

		if (isset($opts['slug'])) {
			$this->db->where('slug', '=', $opts['slug']);
		}

		$result = $this->db->get();

		if ($result) {
			// get images
			$this->files_trees = $this->load_model('files_trees_model');
			$result->images = $this->files_trees->get_all_by_ref_id($result->id);

			// origins
			$result->origins = $this->db->table('trees_origins _to')
				->select('o.id, o.name')
				->where('tree_id', $result->id)
				->innerJoin('origins o', 'o.id', '_to.origin_id')
				->getAll();

			// regions
			$result->regions = $this->db->table('trees_regions tr')
				->select('r.id, r.name')
				->where('tr.tree_id', $result->id)
				->innerJoin('regions r', 'r.id', 'tr.region_id')
				->getAll();

			// zone
			$result->zone = $this->db->table('zones')
				->select('id, name')
				->where('id', $result->zone_id)
				->get();

			// family and genus (get 1)
			$result->family_genus = $this->db->table('genuses g')
				->select('g.id AS genus_id, g.name AS genus_name, f.id AS family_id, f.name AS family_name')
				->where('g.id', $result->genus_id)
				->innerJoin('families f', 'f.id', 'g.family_id')
				->get();

			// categories
			$result->trees_category = $this->db->table('trees_category')
				->select('id, name')
				->where('id', $result->trees_category_id)
				->get();

			// shapes
			$result->shapes = $this->db->table('trees_shapes ts')
				->select('s.id, s.name')
				->where('ts.tree_id', $result->id)
				->innerJoin('shapes s', 's.id', 'ts.shape_id')
				->getAll();

			// trunk_arrangements
			$result->trunk_arrangements = $this->db->table('trees_trunk_arrangements tta')
				->select('ta.id, ta.name')
				->where('tta.tree_id', $result->id)
				->innerJoin('trunk_arrangements ta', 'ta.id', 'tta.trunk_arrangement_id')
				->getAll();

			// bark
			$result->bark = $this->db->table('trees_bark tb')
				->select('b.id, b.name')
				->where('tb.tree_id', $result->id)
				->innerJoin('bark b', 'b.id', 'tb.bark_id')
				->getAll();

			// natural habitat
			$result->natural_habitat = $this->db->table('trees_natural_habitat tnh')
				->select('nh.id, nh.name')
				->where('tnh.tree_id', $result->id)
				->innerJoin('natural_habitat nh', 'nh.id', 'tnh.natural_habitat_id')
				->getAll();

			// common uses
			$result->common_uses = $this->db->table('trees_common_uses tcu')
				->select('cu.id, cu.name')
				->where('tcu.tree_id', $result->id)
				->innerJoin('common_uses cu', 'cu.id', 'tcu.common_use_id')
				->getAll();

			// wood uses
			$result->wood_uses = $this->db->table('trees_wood_uses twu')
				->select('wu.id, wu.name')
				->where('twu.tree_id', $result->id)
				->innerJoin('wood_uses wu', 'wu.id', 'twu.wood_use_id')
				->getAll();

			// unique attractions
			$result->unique_attractions = $this->db->table('trees_unique_attractions tua')
				->select('ua.id, ua.name')
				->where('tua.tree_id', $result->id)
				->innerJoin('unique_attractions ua', 'ua.id', 'tua.unique_attraction_id')
				->getAll();

			// tolerances
			$result->tolerances = $this->db->table('trees_tolerances tt')
				->select('tl.id, tl.name')
				->where('tt.tree_id', $result->id)
				->innerJoin('tolerances tl', 'tl.id', 'tt.tolerance_id')
				->getAll();

			// reproduction types
			$result->reproduction_type = $this->db->table('reproduction_types')
				->select('id, name')
				->where('id', $result->reproduction_type_id)
				->get();

			return $result;
		}

		return false;
	}

	public function count()
	{
		$result = $this->db->table('trees')->count('id', 'total_rows')->get();
		if ($result) {
			return (int)$result->total_rows;
		} 
		return false;
	}

	public function add($opts)
	{
		if (is_array($opts['insert'])) {
			$this->db->table('trees')->insert($opts['insert']);
			$new_tree_id = $this->db->insertId();

			// many to many tables
			if (isset($opts['joins'])) {
				$joins = $opts['joins'];

				$this->insert_joins($new_tree_id, $joins, 'origins', 'origin_id', 'trees_origins');
				$this->insert_joins($new_tree_id, $joins, 'regions', 'region_id', 'trees_regions');
				$this->insert_joins($new_tree_id, $joins, 'shapes', 'shape_id', 'trees_shapes');
				$this->insert_joins($new_tree_id, $joins, 'trunk_arrangements', 'trunk_arrangement_id', 'trees_trunk_arrangements');
				$this->insert_joins($new_tree_id, $joins, 'bark', 'bark_id', 'trees_bark');
				$this->insert_joins($new_tree_id, $joins, 'natural_habitat', 'natural_habitat_id', 'trees_natural_habitat');
				$this->insert_joins($new_tree_id, $joins, 'common_uses', 'common_use_id', 'trees_common_uses');
				$this->insert_joins($new_tree_id, $joins, 'wood_uses', 'wood_use_id', 'trees_wood_uses');
				$this->insert_joins($new_tree_id, $joins, 'unique_attractions', 'unique_attraction_id', 'trees_unique_attractions');
				$this->insert_joins($new_tree_id, $joins, 'tolerances', 'tolerance_id', 'trees_tolerances');

			}

			return $new_tree_id;
		}

		return false;
	}

	protected function insert_joins($tree_id, $joins, $table_name, $table_id_name, $join_table_name) {
		if (isset($joins[$table_name])) {
			$ids = (! is_array($joins[$table_name])) ? explode(',', $joins[$table_name]) : $joins[$table_name];

			foreach ($ids as $id) {
				$ins = ['tree_id' => $tree_id, $table_id_name => $id];
				$this->db->table($join_table_name)->insert($ins);
			}
		}
	}

	public function update($opts = [])
	{
		$tree_id = $this->db->table('trees')->where($opts['where'])->get()->id;

		if (isset($opts['where']) && isset($opts['update'])) {
			$this->db->table('trees');
			$this->db->where($opts['where'])->update($opts['update']);
		}

		// many to many tables
		if (isset($opts['joins'])) {
			$joins = $opts['joins'];

			$this->update_joins($tree_id, $joins, 'origins', 'origin_id', 'trees_origins');
			$this->update_joins($tree_id, $joins, 'regions', 'region_id', 'trees_regions');
			$this->update_joins($tree_id, $joins, 'shapes', 'shape_id', 'trees_shapes');
			$this->update_joins($tree_id, $joins, 'trunk_arrangements', 'trunk_arrangement_id', 'trees_trunk_arrangements');
			$this->update_joins($tree_id, $joins, 'bark', 'bark_id', 'trees_bark');
			$this->update_joins($tree_id, $joins, 'natural_habitat', 'natural_habitat_id', 'trees_natural_habitat');
			$this->update_joins($tree_id, $joins, 'common_uses', 'common_use_id', 'trees_common_uses');
			$this->update_joins($tree_id, $joins, 'wood_uses', 'wood_use_id', 'trees_wood_uses');
			$this->update_joins($tree_id, $joins, 'unique_attractions', 'unique_attraction_id', 'trees_unique_attractions');
			$this->update_joins($tree_id, $joins, 'tolerances', 'tolerance_id', 'trees_tolerances');
		}
	}

	protected function update_joins($tree_id, $joins, $table_name, $table_id_name, $join_table_name) {
		if (isset($joins[$table_name])) {
			// clear existing associations
			$this->db->table($join_table_name)->where('tree_id', $tree_id)->delete();

			// insert new associations
			$trunk_arrangements = is_array($joins[$table_name]) ? $joins[$table_name] : explode(',', $joins[$table_name]);
			foreach ($trunk_arrangements as $trunk_arrangement_id) {
				$this->db->table($join_table_name)->insert(['tree_id' => $tree_id, $table_id_name => $trunk_arrangement_id]);
			}
		}
	}

	public function remove($opts = [])
	{
		if ($opts) {
			$this->db->table('trees');

			if (isset($opts['id'])) {
				$this->db->where('id', '=', $opts['id']);
			}

			if (isset($opts['slug'])) {
				$this->db->where('slug', '=', $opts['slug']);
			}

			$tree = $this->db->get();

			$deleted_tree_id = $tree->id;

			$this->db->table('trees')->where('id', $deleted_tree_id)->delete();

			// remove joins
			$this->db->table('trees_origins')->where('tree_id', $deleted_tree_id)->delete();
			$this->db->table('trees_regions')->where('tree_id', $deleted_tree_id)->delete();
			$this->db->table('trees_shapes')->where('tree_id', $deleted_tree_id)->delete();
			$this->db->table('trees_trunk_arrangements')->where('tree_id', $deleted_tree_id)->delete();
			$this->db->table('trees_bark')->where('tree_id', $deleted_tree_id)->delete();
			$this->db->table('trees_natural_habitat')->where('tree_id', $deleted_tree_id)->delete();
			$this->db->table('trees_common_uses')->where('tree_id', $deleted_tree_id)->delete();
			$this->db->table('trees_wood_uses')->where('tree_id', $deleted_tree_id)->delete();
			$this->db->table('trees_tolerances')->where('tree_id', $deleted_tree_id)->delete();
			
			// remove files
			$this->db->table('files_trees')->where('ref_id', $deleted_tree_id)->delete();

			return $deleted_tree_id;
		}

		return false;
	}

	public function get_all($opts = [], $isCount = false) 
	{
		$this->db->table('trees t');

		// category
		if (isset($opts['trees_category'])) {
			if (count($opts['trees_category']) > 0) {
				$this->db->in('t.trees_category_id', $opts['trees_category']);
			} else {
				// force no results since trees_category is queried but no trees_category is selected
				return [];
			}
		}

		// include origins
		if (isset($opts['origins'])) {
			if (count($opts['origins']) > 0) {
				$this->db
					->innerJoin('trees_origins _to', '_to.tree_id', 't.id')
					->innerJoin('origins o', 'o.id', '_to.origin_id')
					->in('o.id', $opts['origins']);
			} else {
				// force no results since origin is queried but no origin is selected
				return [];
			}
		}

		// use search criteria
		if (isset($opts['like'])) {
			$this->db->grouped(function($q, $opts) {
				$q->like('t.common_name', '%'.$opts['like'].'%')
				->orLike('t.slug', '%'.$opts['like'].'%');
			}, $opts);
		}

		if ($isCount) {
			 $this->db->select('DISTINCT t.id');

			 $result = $this->db->getAll();

			return count($result);
		} else {
			if (isset($opts['select'])) {
				$this->db->select(implode(',', $opts['select']));
			} else {
				$this->db->select('DISTINCT t.id, t.slug, t.common_name, t.trees_category_id');
			}

			if (isset($opts['offset'])) {
				$this->db->limit($opts['offset'], $opts['limit']);
			}

			// include images
			$this->db
				->select('GROUP_CONCAT(f.name ORDER BY f.sort_order, f.name) AS images')
				->leftJoin('files f', 'f.ref_id', 't.id')
				->groupBy('t.id');

			$result = $this->db->orderBy('common_name')->getAll();

			return $result;
		}
	}
}