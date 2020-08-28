
<?php 
use Config\Config as Config;
use Lib\Utils;
?>

<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<div class="content-wrapper view">
		<section id="about-hero">
		    <div class="row about-row">
		        <div class="small-12 large-7 columns">
		            <div class="left">
		                <h1>Our Goal</h1>
		                <p>To raise awareness of the biology and ecological benefits of trees in the Niagara Region. Specifically, to provide knowledge about identifying and growing beneficial native, and naturallized landscapes.</p>
		            </div>
		        </div>

		        <div class="small-12 large-5 columns">

		        </div>
		    </div>
		</section>

<!-- 		<div class="row">
			<div class="small-12 columns internal">
				<p>Coming soon...</p>
			</div>
		</div> -->
	</div><!-- /content wrapper -->

	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->