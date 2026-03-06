
<?php 
use Config\Config as Config;
use Lib\Utils;
use Lib\Uri;
?>

<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<div class="content-wrapper view view-plant">
		<div class="row">
			<div class="small-12 columns internal">

				<div class="row">
					<div class="small-12 large-8 columns">

						<?php if ($view_data['tree']->images) : ?>
						<div class="images">
							<div class="fooslider-wrapper">
								<div class="fooslider">

									<?php
									foreach ($view_data['tree']->images as $image) { 
										if (strpos($image->name, 'thumb') == false) {
											$caption = isset($image->caption) && ($image->caption) ? '<div class="caption-holder"><figcaption>' . $image->caption . '</figcaption></div>' : '';
											echo '<div class="slide"><div class="slide-inner">';
											echo  '<figure>';
		  									echo	'<img class="view-img" alt="' . Utils::sanitize($image->description) . '" src="'.Config::paths('ROOT_URL').'uploads/trees/'.Utils::sanitize($image->name).'" />';
		  									echo   $caption;
											echo  '</figure>';
											echo '</div></div>';
										}
									}
									?>

									<div class="fooslider-controls">
									  <a class="fs-prev"></a>
									  <a class="fs-next"></a>
									</div>
								</div>
							</div>
						</div>
						<?php endif ?>

						<!-- don't sanitize body since we need html -->
						<div id="desktop-body-area-container">
							<div id="body-area" class="body-area">
								<div class="worko-tabs">
								  
								    <input class="state" type="radio" title="tab-one" name="tabs-state" id="tab-one" checked />
								    <input class="state" type="radio" title="tab-two" name="tabs-state" id="tab-two" />
								    <input class="state" type="radio" title="tab-three" name="tabs-state" id="tab-three" />
								    <?php /* Seeds, Plants, Shipping tabs - uncomment to re-enable (also uncomment labels and panels below)
								    <input class="state" type="radio" title="tab-four" name="tabs-state" id="tab-four" />
								    <input class="state" type="radio" title="tab-five" name="tabs-state" id="tab-five" />
								    <input class="state" type="radio" title="tab-six" name="tabs-state" id="tab-six" />
								    */ ?>

								    <div class="tabs flex-tabs">
								        <label for="tab-one" id="tab-one-label" class="tab">About</label>
								        <label for="tab-two" id="tab-two-label" class="tab">Usage</label>
								        <label for="tab-three" id="tab-three-label" class="tab">Growing</label>
								        <?php /* Seeds, Plants, Shipping tabs - uncomment to re-enable
								        <label for="tab-four" id="tab-four-label" class="tab">Seeds</label>
								        <label for="tab-five" id="tab-five-label" class="tab">Plants</label>
								        <label for="tab-six" id="tab-six-label" class="tab">Shipping</label>
								        */ ?>


								        <div id="tab-one-panel" class="panel active">
								          <h3>About This Plant</h3>
								          <?= $view_data['tree']->body ?>
								        </div>
								        <div id="tab-two-panel" class="panel">
								        	<h3>Traditional Use</h3>
								        	<?php
								        	$tree = $view_data['tree'];
								        	$has_use_content = !empty($tree->folk_use) || !empty($tree->chinese_medicine) || !empty($tree->special_chemistry) || !empty($tree->signature) || !empty($tree->combinations) || !empty($tree->precautions) || !empty($tree->medicinal_species) || !empty($tree->tastes) || !empty($tree->organ_systems) || !empty($tree->thermal_nature) || !empty($tree->moisture) || !empty($tree->parts_used) || !empty($tree->preparations) || !empty($tree->organs_and_tissue);
								        	if ($has_use_content) {
								        		echo '<div class="row small-media-padding">';
								        		echo '<div class="small-12 large-6 columns small-media-padding">';
								        		// Text fields in order: Folk Use, Chinese Medicine, Special Chemistry, Signature, Combinations, Precautions
								        		if (!empty($tree->folk_use)) {
								        			echo '<h4>Folk Use</h4><p>' . nl2br(Utils::sanitize($tree->folk_use)) . '</p>';
								        		}
								        		if (!empty($tree->chinese_medicine)) {
								        			echo '<h4>Chinese Medicine</h4><p>' . nl2br(Utils::sanitize($tree->chinese_medicine)) . '</p>';
								        		}
								        		if (!empty($tree->special_chemistry)) {
								        			echo '<h4>Special Chemistry</h4><p>' . nl2br(Utils::sanitize($tree->special_chemistry)) . '</p>';
								        		}
								        		if (!empty($tree->signature)) {
								        			echo '<h4>Signature</h4><p>' . nl2br(Utils::sanitize($tree->signature)) . '</p>';
								        		}
								        		if (!empty($tree->combinations)) {
								        			echo '<h4>Combinations</h4><p>' . nl2br(Utils::sanitize($tree->combinations)) . '</p>';
								        		}
								        		if (!empty($tree->precautions)) {
								        			echo '<h4>Precautions</h4><p>' . nl2br(Utils::sanitize($tree->precautions)) . '</p>';
								        		}
								        		echo '</div>';
								        		echo '<div class="small-12 large-6 columns small-media-padding">';
								        		// MultiSelect fields in table (same format as seeds tab)
								        		$table_rows = [];
								        		if (!empty($tree->medicinal_species)) {
								        			$table_rows[] = ['Medicinal Species', Utils::sanitize($tree->medicinal_species)];
								        		}
								        		if (!empty($tree->tastes)) {
								        			$names = array_map(function($t) { return $t->name; }, $tree->tastes);
								        			$table_rows[] = ['Tastes', Utils::sanitize(implode(', ', $names))];
								        		}
								        		if (!empty($tree->organ_systems)) {
								        			$names = array_map(function($o) { return $o->name; }, $tree->organ_systems);
								        			$table_rows[] = ['Organ Systems', Utils::sanitize(implode(', ', $names))];
								        		}
								        		if (!empty($tree->thermal_nature)) {
								        			$names = array_map(function($t) { return $t->name; }, $tree->thermal_nature);
								        			$table_rows[] = ['Thermal Nature', Utils::sanitize(implode(', ', $names))];
								        		}
								        		if (!empty($tree->moisture)) {
								        			$names = array_map(function($m) { return $m->name; }, $tree->moisture);
								        			$table_rows[] = ['Moisture', Utils::sanitize(implode(', ', $names))];
								        		}
								        		if (!empty($tree->parts_used)) {
								        			$names = array_map(function($p) { return $p->name; }, $tree->parts_used);
								        			$table_rows[] = ['Parts Used', Utils::sanitize(implode(', ', $names))];
								        		}
								        		if (!empty($tree->preparations)) {
								        			$names = array_map(function($p) { return $p->name; }, $tree->preparations);
								        			$table_rows[] = ['Preparations', Utils::sanitize(implode(', ', $names))];
								        		}
								        		if (!empty($tree->organs_and_tissue)) {
								        			$names = array_map(function($o) { return $o->name; }, $tree->organs_and_tissue);
								        			$table_rows[] = ['Organs and Tissue', Utils::sanitize(implode(', ', $names))];
								        		}
								        		if (!empty($table_rows)) {
								        			echo '<table class="instruction-table"><tbody>';
								        			foreach ($table_rows as $row) {
								        				echo '<tr><th>' . $row[0] . '</th><td>' . $row[1] . '</td></tr>';
								        			}
								        			echo '</tbody></table>';
								        		}
								        		echo '</div>';
								        		echo '</div>';
								        	} else {
								        		echo '<p>Traditional use information coming soon.</p>';
								        	}
								        	?>
								        </div>
								        <div id="tab-three-panel" class="panel">
								        	<h3>Growing Guide</h3>
								        	<?php
								        	$growing_instructions = $view_data['tree']->growing_instructions ? nl2br(Utils::sanitize($view_data['tree']->growing_instructions)) : 'Growing information coming soon.';
								        	echo '<p>' . $growing_instructions . '</p>';
								        	?>
								        </div>
								        <?php /* Seeds, Plants, Shipping panels - uncomment to re-enable
								        <div id="tab-four-panel" class="panel">
								        	<?php
								        	if (isset($view_data['tree']->seed_prod_count[0]) && $view_data['tree']->seed_prod_count[0]->seeds) {
								        		$seeds_pack = $view_data['tree']->seeds_packet ? Utils::sanitize($view_data['tree']->seeds_packet . '+') : 'Coming soon...';
								        		$seeds_gram = $view_data['tree']->seeds_gram ? Utils::sanitize($view_data['tree']->seeds_gram) : 'Coming soon...';
								        		$cost_gram = ($view_data['tree']->cost_gram) ? Utils::sanitize($view_data['tree']->cost_gram) : 'Price coming soon...';
								        		$dormancy_treatment = $view_data['tree']->dormancy_treatment ? Utils::sanitize($view_data['tree']->dormancy_treatment->name) : 'Coming soon...';
								        		$growing_instructions_seeds = $view_data['tree']->growing_instructions ? Utils::sanitize($view_data['tree']->growing_instructions) : 'Coming soon...';
								        		echo '<h3>Growing From Seed</h3><div class="row small-media-padding"><div class="small-12 large-6 columns small-media-padding"><p>Growing from seed is one of the most economical and satisfying ways to build a native plant garden. The table shows brief planting instructions, including how long and what kind of stratification this plant needs. For further information on stratification and seed preparation please refer to our article: <a alt="Preparing To Grow Wild Plant Seeds" href="/articles/native-plants/preparing-to-grow-wild-plant-seeds" target="_blank">Preparing To Grow Wild Plant Seeds</a></p></div><div class="small-12 large-6 columns small-media-padding"><table class="instruction-table"><tbody><tr><th>Seeds/Packet</th><td>' . $seeds_pack . '</td></tr><tr><th>Seeds/Gram</th><td>' . $seeds_gram . '</td></tr><tr><th>Cost/Gram</th><td>$' . $cost_gram . '</td></tr><tr><th>Dormancy Treatment</th><td>' . $dormancy_treatment . '</td></tr><tr><th>Growing Instructions</th><td>' . $growing_instructions_seeds . '</td></tr></tbody></table></div></div>';
								        	} else {
								        		echo 'No seeds available for this plant at this time.';
								        	}
								        	?>
								        </div>
								        <div id="tab-five-panel" class="panel">
								        	<?php
								        	if (isset($view_data['tree']->seed_prod_count[0]) && $view_data['tree']->seed_prod_count[0]->seeds) {
								        		echo '<h3>Growing From Plants</h3><p>Seedlings are a more economical option than established plants and an easier start than growing from seed. 4 pack plants indavidually have and approximate 2" square root ball. We also have large soil block plants, which are a bit more established than the seedlings. These grow as approximate 4" blocks. Plants do surprizingly well in the mail but need special care upon arrival. Please see <a href="/articles/native-plants/planting-mail-order-seedlings">Planting Mail Order Seedlings</a> for information on how to plant and care for seedlings.</p>';
								        	} else {
								        		echo 'No plants available for this plant at this time.';
								        	}
								        	?>
								        </div>
								        <div id="tab-six-panel" class="panel">
								            <h3>Shipping</h3>
								            <p>We currently ship seeds to all Canadian provinces and ship plants just within the provinces of British Columbia and Alberta. Seeds ship year-round and usually take a few days (or longer if you are ordering from a distant province). It usually takes 2-5 business days in the mail for plant orders once shipped. Plants are generally available from May to September and can be reserved during off season; Shipping costs are calculated during checkout. <b>Seed orders over $100 ship free!</b> See <a href="/shipping">Shipping</a> for more details.</p>
								        </div>
								        */ ?>
								    </div>

								</div>
							</div>
						</div>
					</div>
					<div class="small-12 large-4 columns sidebar">

						<div class="title-area">
							<h1><?= Utils::sanitize($view_data['tree']->common_name) ?></h1>
							<h2 class="italic">(<?= Utils::sanitize($view_data['tree']->family_genus->genus_name) ?></span>&nbsp;<?= Utils::sanitize($view_data['tree']->specific_epithet) ?><?php if($view_data['tree']->subspecies) {echo '&nbsp;subsp.&nbsp;'; echo Utils::sanitize($view_data['tree']->subspecies);}?>)</h2>
						</div>

						<div id="mobile-body-area-container"></div>

						<div class="plant-details">
							<h3>Plant Details</h3>
							<div class="list">
								<div class="title">Botanical Name</div>
								<div class="info"><?= Utils::sanitize($view_data['tree']->family_genus->genus_name) .' '. Utils::sanitize($view_data['tree']->specific_epithet); ?>
									<?php if($view_data['tree']->subspecies) {echo 'subsp.&nbsp;'; echo Utils::sanitize($view_data['tree']->subspecies);}?>
								</div>
								<?= $view_data['tree']->other_common_names ? '<div class="title">Other Names</div>' . '<div class="info">' . Utils::sanitize($view_data['tree']->other_common_names) . '</div>' : ''; ?>

								<?= $view_data['tree']->other_species ? '<div class="title">Other Botanical Names</div>' . '<div class="info">' .Utils::sanitize($view_data['tree']->other_species) . '</div>' : ''; ?>
								<div class="title">Family</div> 
								<div class="info"><?= Utils::sanitize($view_data['tree']->family_genus->family_name) ?></div>
							
								<hr/>

								<?php
								$native_to = [];
								if ($view_data['tree']->native_to) {
									foreach ($view_data['tree']->native_to as $_native_to) {
										$native_to[] = $_native_to->name;
									}
									echo '<div class="title">Native to</div>';
									echo '<div class="info">';
									echo Utils::sanitize(implode(', ', $native_to));
									echo '</div>';
								}
								?>

								<?= $view_data['tree']->zone ? '<div class="title">Hardy to zone</div>' . '<div class="info">' .Utils::sanitize($view_data['tree']->zone->name) . '</div>' : ''; ?>

								<?php
								$eco_benefits = [];
								if ($view_data['tree']->eco_benefits) {
									foreach ($view_data['tree']->eco_benefits as $_eco_benefit) {
										$eco_benefits[] = $_eco_benefit->name;
									}
									echo '<div class="title">Eco benefits</div>';
									echo '<div class="info">';
									echo Utils::sanitize(implode(', ', $eco_benefits));
									echo '</div>';
								}
								?>

								<?php
								$natural_habitats = [];
								if ($view_data['tree']->natural_habitat) {
									foreach ($view_data['tree']->natural_habitat as $natural_habitat) {
										$natural_habitats[] = $natural_habitat->name;
									}
									echo '<div class="title">Natural habitat</div>';
									echo '<div class="info">';
									echo Utils::sanitize(implode(', ', $natural_habitats));
									echo '</div>';
								}
								?>

								<?php
								$shapes = [];
								if ($view_data['tree']->shapes) {
									foreach ($view_data['tree']->shapes as $shape) {
										$shapes[] = $shape->name;
									}
									echo '<div class="title">Shapes</div>';
									echo '<div class="info">';
									echo Utils::sanitize(implode(', ', $shapes));
									echo '</div>';
								}
								?>

								<?php 

								if ($view_data['tree']->height_min && $view_data['tree']->height_max) {
									if ($view_data['tree']->height_min == $view_data['tree']->height_max) {
										echo '<div class="title">Height</div>' . '<div class="info">' . Utils::sanitize($view_data['tree']->height_min) . 'ft</div>';
									} else {
										echo '<div class="title">Height</div>' . '<div class="info">' . Utils::sanitize($view_data['tree']->height_min) . '-' . Utils::sanitize($view_data['tree']->height_max) . 'ft</div>';
									}	
								} elseif ($view_data['tree']->height_max) {
									echo '<div class="title">Height</div>' . '<div class="info">up to ' . Utils::sanitize($view_data['tree']->height_max) . 'ft</div>';
								}

								if ($view_data['tree']->width_min && $view_data['tree']->width_max) {
									if ($view_data['tree']->width_min == $view_data['tree']->width_max) {
										echo '<div class="title">width</div>' . '<div class="info">' . Utils::sanitize($view_data['tree']->width_min) . 'ft</div>';
									} else {
										echo '<div class="title">width</div>' . '<div class="info">' . Utils::sanitize($view_data['tree']->width_min) . '-' . Utils::sanitize($view_data['tree']->width_max) . 'ft</div>';
									}	
								}

								?>

								<?= $view_data['tree']->growth_rate ? '<div class="title">Growth rate</div>' . '<div class="info">' . Utils::sanitize($view_data['tree']->growth_rate) . '</div>' : ''; ?>

									<?= $view_data['tree']->lifespan_min && $view_data['tree']->lifespan_max ? '<div class="title">Lifespan</div>' . '<div class="info">' . Utils::sanitize($view_data['tree']->lifespan_min) . '-' . Utils::sanitize($view_data['tree']->lifespan_max) . ' years</div>' : ''; ?>

									<?php
									$unique_attractions = [];
									if ($view_data['tree']->unique_attractions) {
										foreach ($view_data['tree']->unique_attractions as $unique_attraction) {
											$unique_attractions[] = $unique_attraction->name;
										}
										echo '<div class="title">Unique attractions</div>';
										echo '<div class="info">';
										echo Utils::sanitize(implode(', ', $unique_attractions));
										echo '</div>';
									}

									$tolerances = [];
									if ($view_data['tree']->tolerances) {
										foreach ($view_data['tree']->tolerances as $tolerance) {
											$tolerances[] = $tolerance->name;
										}
										echo '<div class="title">Tolerances</div>';
										echo '<div class="info">';
										echo Utils::sanitize(implode(', ', $tolerances));
										echo '</div>';
									}

									$common_uses = [];
									if ($view_data['tree']->common_uses) {
										foreach ($view_data['tree']->common_uses as $common_use) {
											$common_uses[] = $common_use->name;
										}
										echo '<div class="title">Common uses</div>';
										echo '<div class="info">';
										echo Utils::sanitize(implode(', ', $common_uses));
										echo '</div>';
									}

									$light = [];
									if ($view_data['tree']->light) {
										foreach ($view_data['tree']->light as $_light) {
											$light[] = $_light->name;
										}
										echo '<div class="title">Light</div>';
										echo '<div class="info">';
										echo Utils::sanitize(implode(', ', $light));
										echo '</div>';
									}

									$transplanting = [];
									if ($view_data['tree']->transplanting) {
										foreach ($view_data['tree']->transplanting as $_transplanting) {
											$transplanting[] = $_transplanting->name;
										}
										echo '<div class="title">Transplanting</div>';
										echo '<div class="info">';
										echo Utils::sanitize(implode(', ', $transplanting));
										echo '</div>';
									}

									$soil = [];
									if ($view_data['tree']->soil) {
										foreach ($view_data['tree']->soil as $_soil) {
											$soil[] = $_soil->name;
										}
										echo '<div class="title">Soil</div>';
										echo '<div class="info">';
										echo Utils::sanitize(implode(', ', $soil));
										echo '</div>';
									}

									$reproduction_type = [];
									if ($view_data['tree']->reproduction_type) {
										echo '<div class="title">Reproduction type</div>';
										echo '<div class="info">';
										echo Utils::sanitize($view_data['tree']->reproduction_type->name);
										echo '</div>';
									}
									?>	

							</div>
						</div>
						<?php
						$has_products = (isset($view_data['tree']->seed_prod_count[0]) && $view_data['tree']->seed_prod_count[0]->seeds > 0) || (isset($view_data['tree']->plant_prod_count[0]) && $view_data['tree']->plant_prod_count[0]->plants > 0);
						if ($has_products) : ?>
						<h3>Products</h3>
						<!-- container for js -->
						<div id="source-product-list-container"></div>
						<?php endif; ?>
					</div>
				</div>

			</div>
		</div>
	</div><!-- /content wrapper -->

	<!-- insert the current tree id into javascript variable -->
	<script>(function() {
		localStorage.setItem('currentPlantId', <?php echo $view_data['tree']->id; ?>); 
		localStorage.setItem('currentPlantImage', '<?php echo isset($view_data['tree']->images[0]) ? $view_data['tree']->images[0]->name : '' ?>');
		localStorage.setItem('currentPlantCommonName', '<?= Utils::sanitize($view_data['tree']->common_name) ?>');
		
		localStorage.setItem('currentPlantBotanicalName', '<?php
			if(isset($view_data['tree']->family_genus->genus_name))
				{echo Utils::sanitize($view_data['tree']->family_genus->genus_name);} 
			if(isset($view_data['tree']->specific_epithet))
				{echo Utils::sanitize($view_data['tree']->specific_epithet);}
			if(isset($view_data['tree']->subspecies))
				{echo '&nbsp;subsp.&nbsp;' . Utils::sanitize($view_data['tree']->subspecies);} 
		?>');
		localStorage.setItem('currentPlantUrl', '<?php Uri::get_current_url() ?>');
	})();</script>

	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->