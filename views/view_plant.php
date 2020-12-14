
<?php 
use Config\Config as Config;
use Lib\Utils;
?>

<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<div class="content-wrapper view">
		<div class="row">
			<div class="small-12 columns internal">

				<div class="row">
					<div class="small-12 large-8 columns">
						<div class="title-area">
							<h1><?= Utils::sanitize($view_data['tree']->common_name) ?></h1>&nbsp;&nbsp;
							<h2 class="italic">(<?= Utils::sanitize($view_data['tree']->family_genus->genus_name) ?></span>&nbsp;<?= Utils::sanitize($view_data['tree']->specific_epithet) ?><?php if($view_data['tree']->subspecies) {echo '&nbsp;subsp.&nbsp;'; echo Utils::sanitize($view_data['tree']->subspecies);}?>)</h2>
						</div>

						<div id="example-component"></div>

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
									  <a class="fs-prev">prev</a>
									  <a class="fs-next">next</a>
									</div>
								</div>
							</div>

						</div>
						<?php endif ?>

						<!-- don't sanitize body since we need html -->
						<div class="body-area"><?= $view_data['tree']->body ?></div>
					</div>
					<div class="small-12 large-4 columns sidebar">
						<?= '<span class="bold">Botanical Name</span>: ' . Utils::sanitize($view_data['tree']->family_genus->genus_name) .'&nbsp;'. Utils::sanitize($view_data['tree']->specific_epithet) . '<br>'; ?>

						<?= $view_data['tree']->other_common_names ? '<span class="bold">Other Names</span>: ' . Utils::sanitize($view_data['tree']->other_common_names) . '<br>' : ''; ?>

						<?= $view_data['tree']->other_species ? '<span class="bold">Other Botanical Names</span>: ' . Utils::sanitize($view_data['tree']->other_species) . '<br>' : ''; ?>
						
						<span><span class="bold">Family</span>: <?= Utils::sanitize($view_data['tree']->family_genus->family_name) ?></span>
						
						<hr/>

						<?php
						$native_to = [];
						if ($view_data['tree']->native_to) {
							foreach ($view_data['tree']->native_to as $_native_to) {
								$native_to[] = $_native_to->name;
							}
							echo '<span class="bold">Native to</span>: ';
							echo Utils::sanitize(implode(', ', $native_to));
							echo '<br>';
						}
						?>

						<?= $view_data['tree']->zone ? '<span class="bold">Hardy to zone</span>: ' . Utils::sanitize($view_data['tree']->zone->name) . '<br>' : ''; ?>

						<?php
						$eco_benefits = [];
						if ($view_data['tree']->eco_benefits) {
							foreach ($view_data['tree']->eco_benefits as $_eco_benefit) {
								$eco_benefits[] = $_eco_benefit->name;
							}
							echo '<span class="bold">Eco benefits</span>: ';
							echo Utils::sanitize(implode(', ', $eco_benefits));
							echo '<br>';
						}
						?>

						<?php
						$natural_habitats = [];
						if ($view_data['tree']->natural_habitat) {
							foreach ($view_data['tree']->natural_habitat as $natural_habitat) {
								$natural_habitats[] = $natural_habitat->name;
							}
							echo '<span class="bold">Natural habitat</span>: ';
							echo Utils::sanitize(implode(', ', $natural_habitats));
							echo '<br>';
						}
						?>

						<?php
						$shapes = [];
						if ($view_data['tree']->shapes) {
							foreach ($view_data['tree']->shapes as $shape) {
								$shapes[] = $shape->name;
							}
							echo '<span class="bold">Shapes</span>: ';
							echo Utils::sanitize(implode(', ', $shapes));
							echo '<br>';
						}
						?>

						<?php 

						if ($view_data['tree']->height_min && $view_data['tree']->height_max) {
							if ($view_data['tree']->height_min == $view_data['tree']->height_max) {
								echo '<span class="bold">Height</span>: ' . Utils::sanitize($view_data['tree']->height_min) . 'ft<br>';
							} else {
								echo '<span class="bold">Height</span>: ' . Utils::sanitize($view_data['tree']->height_min) . '-' . Utils::sanitize($view_data['tree']->height_max) . 'ft<br>';
							}	
						}

						if ($view_data['tree']->width_min && $view_data['tree']->width_max) {
							if ($view_data['tree']->width_min == $view_data['tree']->width_max) {
								echo '<span class="bold">width</span>: ' . Utils::sanitize($view_data['tree']->width_min) . 'ft<br>';
							} else {
								echo '<span class="bold">width</span>: ' . Utils::sanitize($view_data['tree']->width_min) . '-' . Utils::sanitize($view_data['tree']->width_max) . 'ft<br>';
							}	
						}

						?>

						<?= $view_data['tree']->growth_rate ? '<span class="bold">Growth rate</span>: ' . Utils::sanitize($view_data['tree']->growth_rate) . '</span><br>' : ''; ?>

						<?= $view_data['tree']->lifespan_min && $view_data['tree']->lifespan_max ? '<span class="bold">Lifespan</span>: ' . Utils::sanitize($view_data['tree']->lifespan_min) . '-' . Utils::sanitize($view_data['tree']->lifespan_max) . ' years<br>' : ''; ?>

						<?php
						$unique_attractions = [];
						if ($view_data['tree']->unique_attractions) {
							foreach ($view_data['tree']->unique_attractions as $unique_attraction) {
								$unique_attractions[] = $unique_attraction->name;
							}
							echo '<span class="bold">Unique attractions</span>: ';
							echo Utils::sanitize(implode(', ', $unique_attractions));
							echo '<br>';
						}
						?>

						<?php
						$tolerances = [];
						if ($view_data['tree']->tolerances) {
							foreach ($view_data['tree']->tolerances as $tolerance) {
								$tolerances[] = $tolerance->name;
							}
							echo '<span class="bold">Tolerances</span>: ';
							echo Utils::sanitize(implode(', ', $tolerances));
							echo '<br>';
						}
						?>

						<?php
						$common_uses = [];
						if ($view_data['tree']->common_uses) {
							foreach ($view_data['tree']->common_uses as $common_use) {
								$common_uses[] = $common_use->name;
							}
							echo '<span class="bold">Common uses</span>: ';
							echo Utils::sanitize(implode(', ', $common_uses));
							echo '<br>';
						}
						?>

						<?php
						$insects = [];
						if ($view_data['tree']->insects) {
							foreach ($view_data['tree']->insects as $insect) {
								$insects[] = $insect->name;
							}
							echo '<span class="bold">Insects</span>: ';
							echo Utils::sanitize(implode(', ', $insects));
							echo '<br>';
						}
						?>

						<?php
						$diseases = [];
						if ($view_data['tree']->diseases) {
							foreach ($view_data['tree']->diseases as $disease) {
								$diseases[] = $disease->name;
							}
							echo '<span class="bold">Diseases</span>: ';
							echo Utils::sanitize(implode(', ', $diseases));
							echo '<br>';
						}
						?>


						<?php
						$light = [];
						if ($view_data['tree']->light) {
							foreach ($view_data['tree']->light as $_light) {
								$light[] = $_light->name;
							}
							echo '<span class="bold">Light</span>: ';
							echo Utils::sanitize(implode(', ', $light));
							echo '<br>';
						}
						?>

						<?php
						$transplanting = [];
						if ($view_data['tree']->transplanting) {
							foreach ($view_data['tree']->transplanting as $_transplanting) {
								$transplanting[] = $_transplanting->name;
							}
							echo '<span class="bold">Transplanting</span>: ';
							echo Utils::sanitize(implode(', ', $transplanting));
							echo '<br>';
						}
						?>

						<?php
						$soil = [];
						if ($view_data['tree']->soil) {
							foreach ($view_data['tree']->soil as $_soil) {
								$soil[] = $_soil->name;
							}
							echo '<span class="bold">Soil</span>: ';
							echo Utils::sanitize(implode(', ', $soil));
							echo '<br>';
						}
						?>

						<?php
						$reproduction_type = [];
						if ($view_data['tree']->reproduction_type) {
							echo '<span class="bold">Reproduction type</span>: ';
							echo Utils::sanitize($view_data['tree']->reproduction_type->name);
							echo '<br>';
						}
						?>

					</div>
				</div>

			</div>
		</div>
	</div><!-- /content wrapper -->

	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->