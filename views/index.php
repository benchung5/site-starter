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

        <section id="beautiful-peices">
                <div class="beautiful-peices-bg"></div>
                <div class="stroke-top"></div>
                <div class="stroke-bottom"></div>
                <div class="row beautiful-peices-row main-row">
                    <div class="show-for-large small-12 large-5 columns left">
                        <picture class="device-middle" data-scroll>
                          <source srcset="assets/img/device-middle.png" media="(min-width: 1200px)">
                          <source srcset="assets/img/device-middle.png">
                          <img src="assets/img/device-middle.png" >
                        </picture>
                    </div>
                    <div class="small-12 large-7 columns right medium-media-padding">
                        <div data-scroll>
                            <h3>Fusce lorem leo, porttitor non</h3>
                            <p>Fusce lorem leo, porttitor non aliquet vel, mollis eget magna. Integer sodales ornare ipsum, in placerat metus lobortis a. dis parturient.</p>
                        </div>
                        <div class="row types-count-row" data-scroll>
                            <div class="small-6 columns">
                                <div class="types-count">
                                    <a href="#" class="circle-button monument" alt="monument"><div class="icon"></div></a>
                                    <span class="large" data-monument></span> Curabitur
                                </div>
                                <div class="types-count">
                                    <a href="#" class="circle-button mural" alt="murals"><div class="icon"></div></a>
                                    <span class="large" data-mural></span> Quisque
                                </div>
                                <div class="types-count">
                                    <a href="#" class="circle-button totem" alt="totems"><div class="icon"></div></a>
                                    <span class="large" data-totem></span> Nullam
                                </div>
                            </div>
                            <div class="small-6 columns">
                                <div class="types-count">
                                    <a href="#" class="circle-button sculpture" alt="sculpture"><div class="icon"></div></a>
                                    <span class="large" data-sculpture></span> Donec
                                </div>
                                <div class="types-count">
                                    <a href="#" class="circle-button statue" alt="statue"><div class="icon"></div></a>
                                    <span class="large" data-statue></span> Suspendisse
                                </div>
                                <div class="types-count">
                                    <a href="#" class="circle-button installation" alt="installations"><div class="icon"></div></a>
                                    <span class="large" data-installation></span> Etiam
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




