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
                        <h1>Interior Pacific North West Native Plants</h1>
                        <p>We are a small, family owned <span style="color: #e0e003;">native tree farm</span> located in Prince George, BC. We grow trees and shrubs native to the interior pacific north west.
                            
                        </p>
                        <a class="button-action transparent" href="/plants#?native_to=western-north-america?trees_category_id=shrubs-woody-plants+deciduous-trees+coniferous-trees">View Trees & Shrubs</a>
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
                        <p>Search trees and woody plants native to the Interior Pacific North West</p>
                    </div>
                </div>
            </div>
        </section>
        <section id="gallery" data-scroll>
                <div class="gallery-wrapper">
                    <a href="/plants#trees_category_id=deciduous-trees?native_to=western-north-america" class="gal-item img1">
                        <div class="heading-wrapper">
                            <h4>Deciduous Trees</h4>
                        </div>
                    </a>
                    <a href="/plants#trees_category_id=coniferous-trees?native_to=western-north-america" class="gal-item img2">
                        <div class="heading-wrapper">
                            <h4>Coniferous Trees</h4>
                        </div>
                    </a>
                    <a href="/plants#trees_category_id=shrubs-woody-plants?native_to=western-north-america" class="gal-item img3">
                        <div class="heading-wrapper">
                            <h4>Shrubs & Woody Plants</h4>
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
                            <h3>Our Native Plant Nursery</h3>
                            <p>
                                 Nearly all our plants are propagated with our own wild harvested seeds and vegetation. Natural methods are also used rather than pesticides and herbicides. <a style="color:#e0e003;" href="/contact">Contact us</a> if interested in an order, we welcome wholesale and appointements for smaller retail orders.
                        </div>
                    </div>
                    <div class="small-12 large-7 columns right medium-media-padding">

                        <div class="row action-items-row" data-scroll>
                            <div class="small-6 columns buttons-anim-one">
                                <div class="action-item">
                                    <a class="circle-button seeds" alt="seeds"><div class="icon"></div></a>
                                    <a class="text"><h3 class="inherit-parent-text">Seeds</h4></a>
                                </div>
                                <div class="action-item">
                                    <a class="circle-button bare-root-plants" alt="bare root plants"><div class="icon"></div></a>
                                    <a class="text"><h3 class="inherit-parent-text">Bare Root plants</h4></a>
                                </div>
                                <div class="action-item">
                                    <a class="circle-button seedlings" alt="seedlings"><div class="icon"></div></a>
                                    <a class="text"><h3 class="inherit-parent-text">Seedlings</h4></a>
                                </div>
                            </div>
                            <div class="small-6 columns buttons-anim-two">
                                <div class="action-item">
                                    <a class="circle-button potted-plants" alt="potted plants"><div class="icon"></div></a>
                                    <a class="text"><h3 class="inherit-parent-text">Potted Plants</h4></a>
                                </div>
                                <div class="action-item">
                                    <a class="circle-button planting" alt="planting"><div class="icon"></div></a>
                                    <a class="text"><h3 class="inherit-parent-text">Planting</h4></a>
                                </div>
                                <div class="action-item">
                                    <a class="circle-button consulting" alt="consulting"><div class="icon"></div></a>
                                   <a class="text"><h3 class="inherit-parent-text">Consulting</h4></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    </div><!-- /content wrapper -->

    <?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->




