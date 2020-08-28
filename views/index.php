<?php 
$this->insert('header', $view_data );
$this->insert('featured', $view_data );
?>

<div class="home-page site-wrapper">
    <div class="content-wrapper">
        <section id="hero">
            <div class="row hero-row">
                <div class="small-12 large-12 columns">
                    <div class="center">
                        <h1>Create Natural Surroundings</h1>
                        <p>The Niagara Region is home to some of the most unique and diverse fauna in Canada.
                            Help preserve local ecosystems by learning how to identify and grow native trees.
                        </p>
                        <a class="button-view-models transparent" href="plants">Search Native Trees</a>
                    </div>
                </div>
            </div>
        </section>

        <section id="explore">
           <div class="row">
                <div class="small-12 columns medium-media-padding">
                    <div class="center-info" data-scroll>
                        <h3>Niagara Native Tree Finder</h3>
                        <p>Search trees and woody plants native to the Niagara region</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="gallery" data-scroll>
                <div class="gallery-wrapper">
                    <a href="/plants#categories=deciduous-trees" class="gal-item img1">
                        <div class="heading-wrapper">
                            <h3>Deciduous Trees</h3>
                        </div>
                    </a>
                    <a href="/plants#categories=coniferous-trees" class="gal-item img2">
                        <div class="heading-wrapper">
                            <h3>Coniferous Trees</h3>
                        </div>
                    </a>
                    <a href="/plants#categories=shrubs-woody-plants" class="gal-item img3">
                        <div class="heading-wrapper">
                            <h3>Shrubs & Woody Plants</h3>
                        </div>
                    </a>
                </div>
                <div class="clear"></div>
        </section>
    </div><!-- /content wrapper -->

    <?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->




