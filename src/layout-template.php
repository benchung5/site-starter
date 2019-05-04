<?php 
use Config\Config as Config;
use Lib\Uri;
?>

<!doctype html>
<html class="no-js" lang="en" ng-app="onePix">
  <head>

  <!-- meta -->
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nature With Us</title>
  <meta name="description" content="Ecological landscape design: combining art, horticulture and ecology to create sustainable landscapes">
  <meta name="author" content="Ben Chung">
   
  <!-- Mobile app Tags -->
  <meta name="application-name" content="appname">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-title" content="App Title">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="msapplication-starturl" content="/">
  <meta name="msapplication-navbutton-color" content="#e1306c">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@handle">
  <meta name="twitter:title" content="">
  <meta name="twitter:description" content="">
  <meta name="twitter:image:src" content="">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="">
  <meta property="og:title" content="">
  <meta property="og:url" content="">
  <meta property="og:description" content="">
  <meta property="og:image" content="">
  
  <!-- Favicon (place files in root) -->
  <link rel="apple-touch-icon" sizes="180x180" href="assets/favicons/apple-touch-icon.png">
  <link rel="icon" type="image/png" href="assets/favicons/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="assets/favicons/favicon-16x16.png" sizes="16x16">
  <link rel="manifest" href="assets/favicons/manifest.json">
  <link rel="mask-icon" href="assets/favicons/safari-pinned-tab.svg" color="#eb0029">
  <link rel="shortcut icon" href="assets/favicons/favicon.ico">
  <meta name="msapplication-config" content="assets/favicons/browserconfig.xml">
  <meta name="theme-color" content="#ffffff">

  <style>
    .preload {
      background-color: rgba(255,255,255,1);
      transition: opacity 0.5s;
      position: fixed;
      width: 100vw;
      height: 100vh;
      right: 0;
      left: 0;
      opacity: 1;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .preload.loaded {
      /*slight delay (.1s) to ensure smooth*/
      animation: fadeOut .15s ease .1s both;
    }
    @keyframes fadeOut {
      from { opacity: 1; visibility: visible; }
      to { opacity: 0; visibility: hidden; }
    }
  </style>

  <script type="text/javascript">
    //IE9/10 polyfill custom event
    //use like this:
    // let LoadSceneEvent = CustomEvent("sceneLoaded", { bubbles: false, cancelable: false, detail: 'my event detail' });
    function CustomEvent ( event, params ) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent( 'CustomEvent' );
      evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
      return evt;
    }
    CustomEvent.prototype = window.Event.prototype;

    //add window contentLoaded event
    var ContentLoadedEvent = CustomEvent("contentLoaded", { bubbles: false, cancelable: false, detail: {}});

    // combination of the DOMContentLoaded event and requestAnimationFrame. 
    // DOMContentLoaded fires after the document has been completely loaded and parsed but before 
    // all of the images and other assets on the page have completed downloading. 
    //requestAnimationFrame will delay the removal of the class until after the page hasbeen painted so the element will properly transition.
    document.addEventListener("DOMContentLoaded", function(event) {
        window.requestAnimationFrame(showPage);
    });

    function showPage() {
      var preload = document.querySelector('.preload');
      if(preload) {
        addClass(preload, 'loaded');

        window.dispatchEvent(ContentLoadedEvent);
      }
    }

    //class add / remove
    function addClass(el, className) {
        if (el.classList) el.classList.add(className);
        else if (!hasClass(el, className)) el.className += ' ' + className;
    }

    // (function() {
    //   var loadCSS = function(url, callback, location){
    //       //url is URL of external file, callback is the code
    //       //to be called from the file, location is the location to 
    //       //insert the <link> element
      
    //       var linkTag = document.createElement('link');
    //       linkTag.rel  = 'stylesheet';
    //       linkTag.type = 'text/css';
    //       linkTag.media = 'all';
    //       linkTag.href = url;
    //       linkTag.onload = callback;
    //       linkTag.onreadystatechange = callback;
    //       location.appendChild(linkTag);
    //   };
    //   var onScriptLoaded = function(){
    //     //callback code here
    //   }
    //   //if on an admin page
    //   var regex = new RegExp(/((\badmin\b)|(\bsignin\b)|(\bsignout\b)|(\bprotected\b))/);
    //   var isAdmin = regex.test(window.location.pathname);
    //   if (isAdmin) {
    //     loadCSS('/assets/css/admin.css', onScriptLoaded, document.head);
    //   } else {
    //     loadCSS('/assets/css/app.css', onScriptLoaded, document.head);
    //   }
    // })()
  </script>

  <?php
    $segments = Uri::get_parts();
    if (isset($segments['controller']) && $segments['controller'] == 'admin') {
      echo '<link href="'.Config::paths('ROOT_URL').'assets/css/admin.css'.'" rel="stylesheet" type="text/css">';
    } else {
      echo '<link href="'.Config::paths('ROOT_URL').'assets/css/app.css'.'" rel="stylesheet" type="text/css">';
    }
  ?>

  <!-- CSS -->

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900" rel="stylesheet" type="text/css">
  
  <!-- Head scripts like Modernizr -->
  <script src="<?= Config::paths('ROOT_URL').'assets/js/head.js' ?>"></script>

  <!-- Analytics -->
  <script>
    //(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    //(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    //m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    //})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    //ga('create', 'UA-XXXXXXXX-X', 'auto');
    //ga('send', 'pageview');
  </script>
 
  </head>
  
  <body data-<?= $view_data['current_page'] ?> >

  <!-- preload screen (put above everything) -->
<!--   <div class="preload">
  </div> -->

  <!-- begin main content -->
  <?php
  include $main_content;
  ?>
  <!-- end main content -->

  <!-- vendor libs -->
  <script src="<?= Config::paths('ROOT_URL').'assets/js/vendor.js' ?>"></script>
  <!-- app js -->
  <script src="<?= Config::paths('ROOT_URL').'assets/js/app.js' ?>"></script>

  <?php
    // enable this in production. When this copies to layout.php, move react loaded in bottom to replce this one

    // only allow react to load on certain routes
    // $segments = Uri::get_parts();
    // $react_pages = ['admin', 'filter', 'filter_trees'];
    // if (isset($segments['controller']) && in_array($segments['controller'], $react_pages)) {
    //   echo '<script type="text/javascript" src="http://localhost:8080/assets/js/react.js"></script>';
    // }
  ?>

  <!-- *** react and footer scripts are loaded belew here *** -->

</body>
</html>