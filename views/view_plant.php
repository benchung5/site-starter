
<?php 
use Config\Config as Config;
use Lib\Utils;
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
								    <input class="state" type="radio" title="tab-four" name="tabs-state" id="tab-four" />

								    <div class="tabs flex-tabs">
								        <label for="tab-one" id="tab-one-label" class="tab">About</label>
								        <label for="tab-two" id="tab-two-label" class="tab">Seeds</label>
								        <label for="tab-three" id="tab-three-label" class="tab">Plants</label>
								        <label for="tab-four" id="tab-four-label" class="tab">Shipping</label>


								        <div id="tab-one-panel" class="panel active">
								          <h3>About</h3>
								          <?= $view_data['tree']->body ?>
								        </div>
								        <div id="tab-two-panel" class="panel">
								        	<h3>Growing From Seed</h3>
								            <div class="row small-media-padding">
					            	            <div class="small-12 large-6 columns small-media-padding">
					            	            	<p>Growing from seed is one of the most economical and satisfying ways to build a native  plant garden. The table shows brief planting instructions, including how long and what kind of stratification this plant needs. For further information on stratification and seed preparation please refer to our article: <a alt="Preparing To Grow Wild Plant Seeds" href="/articles/native-plants/preparing-to-grow-wild-plant-seeds" target="_blank">Preparing To Grow Wild Plant Seeds</a></p>
					            	            </div>
					            	            <div class="small-12 large-6 columns small-media-padding">
					            		            	<table class="instruction-table">
					            			            	<tbody>
					            			            	<tr>
					            				            	<th>Sowing Time</th>
					            				            	<td>Sow in fall for spring germination.</td>
					            			            	</tr>
					            			            	<tr>
					            				            	<th>Seed Treatment</th>
					            				            	<td>Cold moist stratification required.</td>
					            			            	</tr>
					            			            	<tr>
					            				            	<th>Seeding Instructions</th>
					            				            	<td>Coming soon...</td>
					            			            	</tr>
					            		            	</tbody>
					            	            	</table>
					            	            </div>
								            </div>
								        </div>
								        <div id="tab-three-panel" class="panel">
								            <h3>Growing From Plants</h3>
								            <p>Seedlings are a more economical option than established plants and an easier start than growing from seed. Our plants are shipped in soil blocks or plug trays. Plants do surprizingly well in the mail but need special care upon arrival. Please see
								            <a href="/articles/native-plants/planting-mail-order-seedlings">Planting Mail Order Seedlings</a> for information on how to plant and care for seedlings.</p>
								        </div>
								        <div id="tab-four-panel" class="panel">
								            <h3>Shipping</h3>
								            <p>We currently ship within the provinces of British Columbia and Alberta, and it usually takes 2-5 business days in the mail once shipped. Seeds ship year-round, plants are generally available from May to September and can be reserved during off season; Shipping costs are calculated during checkout. See <a href="/shipping">Shipping</a> for more details.
								            </p>
								        </div>
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
						<!-- container for js -->
						<div id="source-product-list-container"></div>

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
					</div>
				</div>

			</div>
		</div>
	</div><!-- /content wrapper -->

	<?php print_r($view_data['tree']->images[0]->name); ?>

	<!-- insert the current tree id into javascript variable -->
	<script>(function() { 
		localStorage.setItem('currentPlantId', <?php echo $view_data['tree']->id; ?>); 
		localStorage.setItem('currentPlantImage', '<?php echo $view_data['tree']->images[0]->name ?>')
	})();</script>

	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->