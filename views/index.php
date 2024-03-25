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
                        <h1>Northern Restoration Seeds and Seedlings</h1>
                        <p>We provide northern <span style="color: #e0e003;">native, naturalized, medicinal</span> seeds and seedlings for naturalists, restoration projects, and wild plant enthusiasts.
                            
                        </p>
                        <a class="button-action transparent" href="/plants#?native_to=western-north-america">View Seeds & Plants</a>
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
                        <h3>View Our Catalogue</h3>
                        <p>Search wild plants and trees of the north</p>
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
                            <h3>Our Conservation Seeds</h3>
                            <p>
                                 We are a small farm, just starting out in northern BC. All of our seeds are either grown on our property or wild harvested. Natural methods are also used rather than pesticides and herbicides. While we work on our online ordering system, feel free to <a style="color:#e0e003;" href="/contact">Contact us</a> if interested in an order.
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
                                    <a class="text"><h3 class="inherit-parent-text">Medical Plants</h4></a>
                                </div>
                                <div class="action-item">
                                    <a class="circle-button callaction-wildflowers" alt="seedlings"><div class="icon"></div></a>
                                    <a class="text"><h3 class="inherit-parent-text">Wildflowers</h4></a>
                                </div>
                            </div>
                            <div class="small-6 columns buttons-anim-two">
                                <div class="action-item">
                                    <a class="circle-button callaction-native-trees" alt="potted plants"><div class="icon"></div></a>
                                    <a class="text"><h3 class="inherit-parent-text"> Native Trees</h4></a>
                                </div>
                                <div class="action-item">
                                    <a class="circle-button callaction-grasses-sedges" alt="planting"><div class="icon"></div></a>
                                    <a class="text"><h3 class="inherit-parent-text">Grasses & Sedges</h4></a>
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




