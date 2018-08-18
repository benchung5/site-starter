
<?php 
use Config\Config as Config;
?>

<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<div class="content-wrapper">
		<div class="row">
			<div class="small-12 columns internal">
				<h1>Model view</h1>
				<ul>
					<li>Name: <?= $view_data['article']->name ?></li>
					<li>Name: <?= $view_data['article']->category_name ?></li>
					<li>
						Themes:
						<div class="item-list">
							<?php foreach ($view_data['article']->themes as $theme) { ?>
								<div class="item"><?= $theme->name ?></div>
							<?php } ?>
						</div>
					</li>
				</ul>

				<div class="images">
					<?php foreach ($view_data['article']->images as $image) { ?>
						<img src="<?=Config::paths('ROOT_URL')?>uploads/articles/<?= $image->name ?>" />
					<?php } ?>
				</div>
							
			</div>
		</div>
	</div><!-- /content wrapper -->

	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->