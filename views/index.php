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
                        <h1>Your Local Prince George Tree Service</h1>
                        <p>We are a small tree and Shrub service, trained and <span style="color: #e0e003;">passionate about the work we do in Prince George, BC.</span> Contact us for a free same day estimate.
                            
                        </p>
                        <a class="button-action transparent" href="contact">Let's Get in Touch</a>
                    </div>
                </div>
                <div class="small-12 xlarge-5 columns">
                </div>
            </div>
        </section>

        <section id="services">
                <div class="services-bg"></div>
                <div class="row services-row main-row">
                    <div class="small-12 large-5 columns left">
                        <div>
                            <h3>Tree Care</h3>
                            <p>Our unique blend of services target home owners or commercial properties needing tree services, pruning, upkeep or a blend of the two. Here are a few of them...</p>
                        </div>
                    </div>
                    <div class="small-12 large-7 columns right medium-media-padding">

                        <div class="row action-items-row" data-scroll>
                            <div class="small-6 columns buttons-anim-one">
                                <div class="action-item">
                                    <a href="services" class="circle-button fine-pruning" alt="fine pruning"><div class="icon"></div></a>
                                    <a class="text" href="services"><h3 class="inherit-parent-text">Fine Pruning</h4></a>
                                </div>
                                <div class="action-item">
                                    <a href="services" class="circle-button hedge-trimming" alt="hedge trimming"><div class="icon"></div></a>
                                    <a class="text" href="services"><h3 class="inherit-parent-text">Hedge Trimming</h4></a>
                                </div>
                                <div class="action-item">
                                    <a href="services" class="circle-button garden-installation" alt="shrub maintenance"><div class="icon"></div></a>
                                    <a class="text" href="services"><h3 class="inherit-parent-text">Shrub Maintenance</h4></a>
                                </div>
                            </div>
                            <div class="small-6 columns buttons-anim-two">
                                <div class="action-item">
                                    <a href="services" class="circle-button tree-removal" alt="tree removal"><div class="icon"></div></a>
                                    <a class="text" href="services"><h3 class="inherit-parent-text">Tree Removal</h4></a>
                                </div>
                                <div class="action-item">
                                    <a href="services" class="circle-button planting" alt="planting"><div class="icon"></div></a>
                                    <a class="text" href="services"><h3 class="inherit-parent-text">Planting</h4></a>
                                </div>
                                <div class="action-item">
                                    <a href="services" class="circle-button consulting" alt="consulting"><div class="icon"></div></a>
                                   <a class="text" href="services"><h3 class="inherit-parent-text">Consulting</h4></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>

        <section id="explore">
           <div class="row">
                <div class="small-12 columns medium-media-padding">
                    <div class="center-info" data-scroll>
                        <h3>Canadian Native Tree Finder</h3>
                        <p>Search trees and woody plants native to Canada</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="gallery" data-scroll>
                <div class="gallery-wrapper">
                    <a href="/plants#categories=deciduous-trees" class="gal-item img1">
                        <div class="heading-wrapper">
                            <h4>Deciduous Trees</h4>
                        </div>
                    </a>
                    <a href="/plants#categories=coniferous-trees" class="gal-item img2">
                        <div class="heading-wrapper">
                            <h4>Coniferous Trees</h4>
                        </div>
                    </a>
                    <a href="/plants#categories=shrubs-woody-plants" class="gal-item img3">
                        <div class="heading-wrapper">
                            <h4>Shrubs & Woody Plants</h4>
                        </div>
                    </a>
                </div>
                <div class="clear"></div>
        </section>
    </div><!-- /content wrapper -->

    <?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->




