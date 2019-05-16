
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
							<h1><?= $view_data['tree']->common_name ?></h1>
						</div>

						<?php //print_r($view_data['tree']);  ?>

						<?php if ($view_data['tree']->images) : ?>
						<div class="images">

							<div class="fooslider-wrapper">
								<div class="fooslider">

									<?php 
									foreach ($view_data['tree']->images as $image) { 
										if (strpos($image->name, 'thumb') == false) {
											echo '<div class="slide"><div class="slide-inner">';
											echo '<img class="view-img" src="'.Config::paths('ROOT_URL').'uploads/trees/'.Utils::sanitize($image->name).'" />';
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
						<span class="bold"><?= Utils::sanitize($view_data['tree']->family_genus->genus_name) ?></span>&nbsp;<span class="bold"><?= Utils::sanitize($view_data['tree']->specific_epithet) ?></span><br>
						<span>Family: <?= Utils::sanitize($view_data['tree']->family_genus->family_name) ?></span><br>

						<?php
						$origins = [];
						if ($view_data['tree']->origins) {
							foreach ($view_data['tree']->origins as $origin) {
								$origins[] = $origin->name;
							}
						}
						?>

						<span>Category: <?= Utils::sanitize($view_data['tree']->trees_category->name) ?></span><br>
						<span>Zone: <?= $view_data['tree']->zone ? Utils::sanitize($view_data['tree']->zone->name) : ''; ?></span><br>
					</div>
				</div>




			</div>

		</div>
	</div><!-- /content wrapper -->

	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->