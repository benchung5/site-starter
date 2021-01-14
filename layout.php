<?php 
use Config\Config as Config;
use Lib\Uri;
use Lib\Meta;
?>

<!doctype html>
<html class="no-js" lang="en" ng-app="onePix">
  <head>
  <!-- meta -->
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>
    <?php 
    $page_title = Meta::get_page_title();
    echo $page_title ?:  SITE_TITLE;
    ?>
  </title>
  <meta name="description" content="<?php
    $page_description = Meta::get_page_description();
    echo $page_description ?:  SITE_DESCRIPTION;
  ?>">
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
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png">
  <link rel="icon" type="image/png" href="/assets/favicons/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="/assets/favicons/favicon-16x16.png" sizes="16x16">
  <link rel="manifest" href="/assets/favicons/manifest.json">
  <link rel="mask-icon" href="/assets/favicons/safari-pinned-tab.svg" color="#eb0029">
  <link rel="shortcut icon" href="/assets/favicons/favicon.ico">
  <meta name="msapplication-config" content="/assets/favicons/browserconfig.xml">
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

  <!-- Head scripts -->
  <script src="<?= Config::paths('ROOT_URL').'assets/js/head.js' ?>"></script>

  <?php
    $segments = Uri::get_parts();
    if (isset($segments['controller'])) {
      // later remove the 'admin' part of this
      if ($segments['controller'] == 'admin' || $segments['controller'] == ('admin_'.Config::paths('ADMIN_ID'))) {
        echo '<link href="'.Config::paths('ROOT_URL').'assets/css/admin.css'.'" rel="stylesheet" type="text/css">';
      } else {
        echo '<link href="'.Config::paths('ROOT_URL').'assets/css/app.css'.'" rel="stylesheet" type="text/css">';
      }
    }

  ?>

  <!-- CSS -->

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900" rel="stylesheet" type="text/css">

  <!-- Analytics -->
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-140991222-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-140991222-1');
  </script>
 
  </head>
  
  <body data-<?= $view_data['current_page'] ?> >

  <!-- preload screen (put above everything) -->
  <?php 
  // if ($segments['controller'] == 'index') {
  //   echo '<div class="preload"></div>';
  // }
  ?>

  <!-- begin main content -->
  <?php
  include $main_content;
  ?>
  <!-- end main content -->

  <!-- vendor libs -->
  <script src="<?= Config::paths('ROOT_URL').'assets/js/vendor.js' ?>"></script>
  <!-- google map api -->
<!--   <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDPvuxrEwbrEv-3Um8Ptt__ymx9EEYoEYs&callback=initMap&libraries=&v=weekly"></script> -->
  <!-- app js -->
  <script src="<?= Config::paths('ROOT_URL').'assets/js/app.js' ?>"></script>



  <!-- *** footer scripts are loaded belew here *** -->

</body>
</html>