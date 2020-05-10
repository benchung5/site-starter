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
                        <p>Nature has always provided us with plants for human health and wellbeing. By using the patterns found in nature, we can working with our surroundings, not against them. Learn how to take advantage of these free services through edible gardens, food forests and permaculture.</p>
                        <a class="button-view-models transparent" href="plants">Permiculture Plant List</a>
                    </div>
                </div>
            </div>
        </section>

        <section id="explore">
           <div class="row">
                <div class="small-12 columns medium-media-padding">
                    <div class="center-info" data-scroll>
                        <h3>Permiculture Gulds</h3>
                        <p>Search favourite permiculture guild plants. Filter by ecological services, attractions, tolerances, and planting needs</p>
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




