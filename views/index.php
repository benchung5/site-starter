<?php 
$this->insert('header', $view_data );
$this->insert('featured', $view_data );
?>

<div class="home-page site-wrapper">
    <div class="content-wrapper">
        <section id="hero">
            <div class="row">
                <div class="small-12 xlarge-7 columns">
                    <div class="center content-container">
                        <h1>Medicinal plants that survive northern winters</h1>
                        <p>Learn how to identify, grow, harvest, and use medicinal plants that <span style="color: #e0e003;">thrive in cold climates</span> (Zone 4 and colder).</p>
                        <a class="button-action transparent" href="/plants">Browse Medicinal Plants</a>
                    </div>
                </div>
                <div class="small-12 xlarge-5 columns">
                </div>
            </div>
        </section>
        <section id="explore">
           <div class="row">
                <div class="small-12 columns medium-media-padding">
                    <div class="center-info" data-scroll>
                        <h3>Browse the Plant List</h3>
                        <p>Explore our growing database of medicinal plants suitable for northern climates. Each plant includes information about growing conditions, hardiness, traditional uses, and practical tips for gardeners.</p>
                    </div>
                </div>
            </div>
        </section>
        <section id="gallery" data-scroll>
                <div class="gallery-wrapper">
                    <a href="/plants#trees_category_id=coniferous-trees+deciduous-trees+shrubs-woody-plants" class="gal-item img1">
                        <div class="heading-wrapper">
                            <h4>Trees & Shrubs</h4>
                        </div>
                    </a>
                    <a href="/plants#trees_category_id=herbaceous-plants" class="gal-item img2">
                        <div class="heading-wrapper">
                            <h4>Herbaceous Plants</h4>
                        </div>
                    </a>
                    <a href="/plants#trees_category_id=grasses-sedges" class="gal-item img3">
                        <div class="heading-wrapper">
                            <h4>Grasses & Sedges</h4>
                        </div>
                    </a>
                </div>
                <div class="clear"></div>
        </section>
        <section id="services">
                <div class="services-bg"></div>
                <div class="row services-row main-row">
                    <div class="small-12 large-5 columns left">
                        <div>
                            <h3>Sharing Northern Medicinal Plant Knowledge</h3>
                            <p>
                                We are surrounded by a seemingly limitless abundance of living flora with hundreds and even thousands of years history in nutritive and traditional medicinal use.  
                                <a style="color:#e0e003;" href="/articles#search=?categories=medicinal-plants">Discover what secrets these wild plants have in store.</a>
                                </p>

                        </div>
                    </div>
                    <div class="small-12 large-7 columns right medium-media-padding">

                        <div class="row action-items-row" data-scroll>
                            <div class="small-6 columns buttons-anim-one">
                                <div class="action-item">
                                    <a class="circle-button callaction-native-plants" alt="seeds"><div class="icon"></div></a>
                                    <a class="text"><h3 class="inherit-parent-text">Native Plants</h4></a>
                                </div>
                                <div class="action-item">
                                    <a class="circle-button callaction-medicinal-plants" alt="bare root plants"><div class="icon"></div></a>
                                    <a class="text"><h3 class="inherit-parent-text">Traditional Plants</h4></a>
                                </div>
                                <div class="action-item">
                                    <a class="circle-button callaction-wildflowers" alt="seedlings"><div class="icon"></div></a>
                                    <a class="text"><h3 class="inherit-parent-text">Wildflowers</h4></a>
                                </div>
                            </div>
                            <div class="small-6 columns buttons-anim-two">
                                <div class="action-item">
                                    <a class="circle-button callaction-native-trees" alt="potted plants"><div class="icon"></div></a>
                                    <a class="text"><h3 class="inherit-parent-text"> Medicinal Trees</h4></a>
                                </div>
                                <div class="action-item">
                                    <a class="circle-button callaction-grasses-sedges" alt="planting"><div class="icon"></div></a>
                                    <a class="text"><h3 class="inherit-parent-text">Sacred Plants</h4></a>
                                </div>
                                <div class="action-item">
                                    <a class="circle-button callaction-wild-edibles" alt="consulting"><div class="icon"></div></a>
                                   <a class="text"><h3 class="inherit-parent-text">Wild Edibles</h4></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    </div><!-- /content wrapper -->

    <?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->




