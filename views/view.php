
<?php 
use Config\Config as Config;
?>

<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<div class="content-wrapper view">
		<div class="row">
			<div class="small-12 columns internal">
				<div class="title-area">
					<h1><?= $view_data['article']->name ?></h1>
					<span><?= $view_data['article']->category_name ?></span>
				</div>
<!-- 						<div class="item-list">
							<?php foreach ($view_data['article']->themes as $theme) { ?>
								<div class="item"><?= $theme->name ?></div>
							<?php } ?>
						</div> -->
				<div class="images">
					<?php 
					foreach ($view_data['article']->images as $image) { 
						if (strpos($image->name, 'thumb') == false) {
							echo '<img class="view-img" src="'.Config::paths('ROOT_URL').'uploads/articles/'.$image->name.'" />';
						}
					}
					?>
				</div>
							
			</div>
		</div>
	</div><!-- /content wrapper -->

	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->