
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
							<h1><?= $view_data['article']->name ?></h1>
						</div>
						<!-- don't sanitize body since we need html -->
						<div class="body-area"><?= $view_data['article']->body ?>
							

						<?php  
						    if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')   
						         $url = "https://";   
						    else  
						         $url = "http://";   
						    // Append the host(domain name, ip) to the URL.   
						    $url.= $_SERVER['HTTP_HOST'];   
						    // Append the requested resource location to the URL   
						    $url.= $_SERVER['REQUEST_URI'];    
						 ?> 

						<!-- <script src="https://platform.linkedin.com/in.js" type="text/javascript">lang: en_US</script>
						<script type="IN/Share" data-url="<?= $url ?>"></script> -->

						<span class="small-text">Share on <a  href="https://www.linkedin.com/sharing/share-offsite/?url=<?= $url ?>"target="_blank" title="Share on LinkedIn">LinkedIn</a></span>
						</div>

					</div>
					<div class="small-12 large-4 columns sidebar">
						<span class="bold">Pubilished</span>: <?= date('F jS, Y', strtotime(Utils::sanitize($view_data['article']->created_on))) ?><br>
						<?php
						$categories = [];
						if ($view_data['article']->categories) {
							foreach ($view_data['article']->categories as $category) {
								$categories[] = $category->name;
							}
						}
						?>
						<span class="bold">Categories</span>: <?= $view_data['article']->categories ? Utils::sanitize(implode(', ', $categories)) : ''; ?><br>
					</div>
				</div>
			</div>

		</div>
	</div><!-- /content wrapper -->

	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->