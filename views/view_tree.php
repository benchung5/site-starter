
<?php 
use Config\Config as Config;
?>

<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<div class="content-wrapper view">
		<div class="row">
			<div class="small-12 columns internal">
				<div class="title-area">
					<h1><?= $view_data['tree']->common_name ?></h1>
				</div>

				<?php //print_r($view_data['tree']);  ?>

				<span><?= $view_data['tree']->family_genus->genus_name ?></span>&nbsp;<span><?= $view_data['tree']->specific_epithet ?></span><br>
				<span>Family: <?= $view_data['tree']->family_genus->family_name ?></span><br>

				<?php
				$origins = [];
				if ($view_data['tree']->origins) {
					foreach ($view_data['tree']->origins as $origin) {
						$origins[] = $origin->name;
					}
				}
				?>

				<span>Category: <?= $view_data['tree']->trees_category->name ?></span><br>
				<span>Native to: <?= $view_data['tree']->origins ? implode(', ', $origins) : ''; ?></span><br>
				<p><?= $view_data['tree']->body ?></p>

				<?php if ($view_data['tree']->images) : ?>
				<div class="images">
					<?php 
					foreach ($view_data['tree']->images as $image) { 
						if (strpos($image->name, 'thumb') == false) {
							echo '<img class="view-img" src="'.Config::paths('ROOT_URL').'uploads/trees/'.$image->name.'" />';
						}
					}
					?>
				</div>
				<?php endif ?>
			</div>
		</div>
	</div><!-- /content wrapper -->

	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->