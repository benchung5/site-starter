
<?php 
use Config\Config as Config;
use Lib\Utils;
?>

<?php $this->insert('header', $view_data ); ?>

<div class="site-wrapper">
	<div class="content-wrapper view">
		<section id="page-hero">
		    <div class="row">
		        <div class="small-12 large-12 columns top">
		                <h1>About Us</h1>
		                <p>
							Hello, My name is Ben Chung. I started this site in 2019 as a blog while in Niagara College 
							studying horticulture. Since then it has evolved to focus on <span style="color: #e0e003;">medicinal plants that grow in 
							northern climates</span>. I grew up in Ottawa as a child, then moved to south eastern Canada. From there, 
							my family and I moved to northern BC (of western Canada) in 2023 and took our chances on an old 
							farm house sitting on 47 acres of beautiful farm land, consisting of half forest and half field.
		                </p>
		                <p>
							Through my travels I got to see the the fragrant and rich autumn colors of the Ottawa Valley, the diverse nut trees 
							and vineyards of Niagara, and finally the striking sub-boreal tundra of northern BC. I was fortunate 
							to experience the pant life around me form one side of Canada to the other. A pattern I learned from moving 
							around from one place to another is that there is a rich bounty of edible and medicinal plants available 
							to us no matter where we live. You don't need to be in the mountains of China or deep in the Amazon forest to 
							find medicinal plants. I huge array of native and introduced plants surround us, offering powerful 
							qualities that have been used by those of ancient North America, Europe, and Asia for centuries. 
							I feel a responsibility to share this knowledge with the world and to make it available to everyone.
		                </p>
		                <p>
							There is something special about graciously harvesting resin from a wild tree and using it to close 
							a wound or sooth a sore throat. Or hanging wildflowers to beautify and freshen the air inside the home. 
							In the early spring, my wife and I take walks and harvest The most amazingly perfect pussy willow 
							branches that grow wild along the ditches of our road. In the winter I never regret the dried herbs
							gathered in the growing season, to aid our health and well being in the winter months.These plants help 
							us feel good both to the 
							eye and for the body. 
		                </p>
						<p>
							The goal of this site is to inform by both word and video, how to grow, forage, and use these 
							amazing plants that can be either cultivated or found. These resources are available to anyone in the world. 
							I may also offer the occasional product, or seeds for those within Canada. I provide basic guidelines 
							on how to use them from a traditional western or Chinese herbal perspective but wish not to dictate 
							your lineage, heritage, or path to treatment from a person to plant view, but rather a plant to 
							person approach... That is, introducing and familiarizing the plants to you from an practical, 
							availability, and discovery point of view. From there you can decide on how to connect with them 
							in your own unique way.
						</p>
		        </div>
		    </div>
		</section>

	</div><!-- /content wrapper -->

	<section id="eco-friendly">
	        <div class="eco-friendly-bg"></div>
	        <div class="row eco-friendly-row main-row">
	            <div class="small-12 large-7 columns left">
	                <div>
	                    <h3>Why Medicinal Plants?</h3>
	                    <p>
							Growing and foraging your own edible medicinal plants has so many 
							benefits that can't all be covered within the scope of this page, but here's a few:
						 </p>
						 <p>
							<ol>
								<li>
								Our family has always been tight for money as many are these days. growing and foraging 
								our own herbs skips out on the outrageous cost of commercial herbal products. We Love 
								the health food store as much as anyone else, and still do buy things occasionally 
								that we didn't have the chance to grow ourselves or that just aren't available in our 
								climate, but it's surprising just how much we see there that we can grow or find ourselves, 
								and this for a small fraction or at no cost at all.  Time is a trade-off but you may 
								find it is quality time well spent. Family time walking in the bush, gathering seeds or 
								flowers. Outside, breathing fresh air, exercising as you prepare gardens. You build your 
								health in multiple ways and  at the same time you are building your self reliance.
								</li>
								<li>
									Using wild plants not only gives economic value, but a guarantee of the highest quality. 
									Wildcrafted herbs can be picked at their peak, and at a location you are familiar with. 
									You've walked down that path many times, you know exactly when the plant parts are ripe, 
									you can see it with your own eyes. When growing your own, you know what's in your soil 
									and you know what you've used to grow your plants. Try smelling the fragrance of dried 
									herbs you've bought from the store, even organic ones compared to the fragrance of the 
									ones you gathered yourself. You will see the difference you'll smell the difference. 
									As good as these shops can be, effects from storing, shipping and processing just can't 
									be avoided when it comes to buying herbs commercially.
								</li>
								<li>
									Helping ourselves as much as we can also saves valuable time when considering how overworked 
									and understaffed the medical system is. Here in northern BC it's a huge problem and the rest 
									of the world is in a similar boat or worse. I'm not implying that these herbs are a replacement 
									for a visit to that of a doctor or other medical practitioner. I simply argue that often 
									there are many things we can do to give our bodies the things it needs to self-repair. With 
									not enough help going around, we can nourish ourselves as much as possible, especially for 
									things that don't for the moment require the attention of a doctor visit. 
								</li>
								<li>
									In my personal experience and within my family life, (and I'll confess my kids aren't even 
									plant people) there is something about using plants that completes us, It seems the more we 
									connect with these plants in their whole form, that is, the state where they are or were 
									recently alive the better. There is human connection and quality time. There is longevity 
									and health. There is economic benefit, self-reliance, and a future. When nature is with us, 
									the happier we are.
								</li>
							</ol>
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