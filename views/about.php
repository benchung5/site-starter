
<?php 
use Config\Config as Config;
use Lib\Utils;
?>

<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<div class="content-wrapper view">
		<section id="about-hero">
		    <div class="row">
		        <div class="small-12 large-7 columns">
		            <div class="left">
		                <h1>About Us</h1>
		                <p>
		                	As a small, family run <span style="color: #e0e003;">native tree and shrub farm</span>. We are passionate about northern BC's unique ecosystem and the important role native plants play in the urban, rural, and the wild environments.
		                </p>
		                <p>
		                	We are fairly new, the business was started in 2020 as a tree service, and we moved to BC with plans to bring our passion of native trees and shrubs to the interior Pacific Northwest, and it's surrounding regions. Our vision came from a combined interest in native plants and ecosystem restoration in forests and urban environments.
		                </p>
		                <p>
		                	Currently we supply potted, bare root, and plug native coniferous trees, deciduous trees, and woody plants.
		                	As a small nursery, our intention is increased value rather than volume, personal relations rather than automation.
		                </p>
		            </div>
		        </div>

		        <div class="small-12 large-5 columns">

		        </div>
		    </div>
		</section>

	</div><!-- /content wrapper -->

	<section id="eco-friendly">
	        <div class="eco-friendly-bg"></div>
	        <div class="row eco-friendly-row main-row">
	            <div class="small-12 large-7 columns left">
	                <div>
	                    <h3>Eco Friendly</h3>
	                    <p>We provide sustainable, eco-friendly methods;
						   avoiding the use of harsh chemicals, and using organic materials for fertilizing and maintainting plant health. As a small farm, hand tools are mainly used used, mitigating our carbon footprint and noise pollution while working. Plant seeds are sourced locally and ethically from our forest or nearby wild sites to reduce transportation emissions. Recycled materials are used to their fullest where possible for structures, propagation, etc.
						 </p>
						 <p>
						   We recommend and promote the use of native trees and plants to support local ecosystems. Plants have a deep connection to the local conditions, mother trees and soil miccorrizae. We believe a few small and seemingly effortless decisions such as diversification, preserving soil health, and growing wild plant species can make lasting changes on the environment.
						 </p>
	                </div>
	            </div>
	            <div class="small-12 large-5 columns right medium-media-padding">

	                <div class="row types-count-row" data-scroll>
	                    <div class="small-12 columns">
	                    	<img src="assets/img/planting-hands.png" alt="eco-friendly">
	                    </div>
	                </div>
	            </div>
	        </div>
	</section>

	<?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->