<?php 
$this->insert('header', $view_data );
$this->insert('featured', $view_data );
?>

<div class="home-page site-wrapper">
    <div class="content-wrapper">
        <section id="hero">
            <div class="row hero-row">
                <div class="small-12 large-7 columns">
                    <div class="left">
                        <h1>Sustainable Landscapes</h1>
                        <p>Preserve Ontario's Biodiversity through native gardens, organic methods and landscape ecology. </p>
                        <a class="button-view-models transparent" href="plants">Search Native Plants</a>
                    </div>
                </div>

                <div class="small-12 large-5 columns">

                </div>
            </div>
        </section>

        <section id="explore">
           <div class="row">
                <div class="small-12 columns medium-media-padding">
                    <div class="center-info" data-scroll>
                        <h3>Ontario Native Plant Finder</h3>
                        <p>Search native Ontario plants by ecozone and landscape use</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="gallery" data-scroll>
                <div class="gallery-wrapper">
                    <a href="/plants#categories=trees-shrubs" class="gal-item img1">
                        <div class="heading-wrapper">
                            <h3>Trees & Shrubs</h3>
                        </div>
                    </a>
                    <a href="/plants#categories=vines-groundcover" class="gal-item img2">
                        <div class="heading-wrapper">
                            <h3>Vines & Groundcover</h3>
                        </div>
                    </a>
                    <a href="/plants#categories=grasses" class="gal-item img3">
                        <div class="heading-wrapper">
                            <h3>Grasses</h3>
                        </div>
                    </a>
                    <a href="/plants#categories=ferns-moss" class="gal-item img4">
                        <div class="heading-wrapper">
                            <h3>Ferns & Moss</h3>
                        </div>
                    </a>
                </div>
                <div class="clear"></div>
        </section>
    </div><!-- /content wrapper -->

    <?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->




