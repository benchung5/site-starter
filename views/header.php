<?php 
use Config\Config as Config;
?>

<header id="header" class="hide-for-print">
    <div class="row">
      <div class="small-12 columns header-inner">
          <div class="logo-main">
            <a href="/" class="logo-img"></a>
          </div>
          <div class="header-right">
            <div id="mobile-cart-icon-container"></div>
            <nav class="menu-container show-for-large">
              <ul class="menu menu-left align-right">
                <li><a href="/" title="Nature With Us Home">Home</a></li>
                <li><a href="/about" title="About Nature With Us">About</a></li>
                <li><a href="/plants" title="Search Our Plants">Our Catalogue</a></li>
                <li><a href="/shipping" title="Shipping">Shipping</a></li>
                <li><a href="/articles" title="Articles">Articles</a></li>
                <li><a href="/contact" title="Contact Nature Wtih Us">Contact</a></li>
              </ul>
              <div id="cart-icon-container"></div>
            </nav>
          </div>

          <div class="mobile-menu-button hide-for-large">
            <button class="grid-button rearrange" type="button" role="button" aria-label="Toggle Navigation">
              <span class="grid"></span>
            </button>
          </div>

          <div class="mobile-menu-container hide-for-large" style="visibility: hidden; opacity: 0;"> 
            <div class="mobile-menu-inner">
              <div class="top">
                <div class="logo-img mobile-top-logo"></div>
              </div>   
              <ul class="menu menu-mobile vertical">
                  <li><a href="/" title="Nature With Us Home">Home</a></li>
                  <li><a href="/plants" title="Search Our Plants">Our Catalogue</a></li>
                  <li><a href="/shipping" title="Shipping">Shipping</a></li>
                  <li><a href="/articles" title="Articles">Articles</a></li>
                  <li><a href="/about" title="About Nature With Us">About</a></li>
                  <li><a href="/contact" title="Contact Nature Wtih Us">Contact</a></li>
              </ul>
              <div class="mobile-menu-stretch"></div>
            </div>
          </div>
      </div>
    </div>
</header>