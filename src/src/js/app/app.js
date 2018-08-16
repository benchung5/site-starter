'use strict';

//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../react-app/config')[env];
import axios from 'axios';
import $ from 'jquery';
window.$ = $;

/* ==========================================================================
load foundation plugins - keep this
========================================================================== */
// import whatInput from 'what-input';
// //import all foundation plugins
// // import Foundation from 'foundation-sites';
// //include specific foundation elements
// import './lib/foundation-explicit-pieces';

(function() {
	//only register sw and manifest if on explore page...
	if(window.location.pathname === '/filter') {
		/* ==========================================================================
		// register service worker
		========================================================================== */

		/* eslint-env browser */
		'use strict';

		if ('serviceWorker' in navigator) {
		  // Your service-worker.js *must* be located at the top-level directory relative to your site.
		  // It won't be able to control pages unless it's located at the same level or higher than them.
		  // *Don't* register service worker file in, e.g., a scripts/ sub-directory!
		  // See https://github.com/slightlyoff/ServiceWorker/issues/468
		  navigator.serviceWorker.register('/service-worker.js').then(function(reg) {
		    // updatefound is fired if service-worker.js changes.
		    reg.onupdatefound = function() {
		      // The updatefound event implies that reg.installing is set; see
		      // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
		      var installingWorker = reg.installing;

		      installingWorker.onstatechange = function() {
		        switch (installingWorker.state) {
		          case 'installed':
		            if (navigator.serviceWorker.controller) {
		              // At this point, the old content will have been purged and the fresh content will
		              // have been added to the cache.
		              // It's the perfect time to display a "New content is available; please refresh."
		              // message in the page's interface.
		              console.log('New or updated content is available.');
		            } else {
		              // At this point, everything has been precached.
		              // It's the perfect time to display a "Content is cached for offline use." message.
		              console.log('Content is now available offline!');
		            }
		            break;

		          case 'redundant':
		            console.error('The installing service worker became redundant.');
		            break;
		        }
		      };
		    };
		  }).catch(function(e) {
		    console.error('Error during service worker registration:', e);
		  });
		}

		// manifest
		window.addEventListener('beforeinstallprompt', function(e) {
		  // beforeinstallprompt Event fired

		  // e.userChoice will return a Promise. 
		  // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
		  e.userChoice.then(function(choiceResult) {

		    console.log(choiceResult.outcome);

		    if(choiceResult.outcome == 'dismissed') {
		      console.log('User cancelled home screen install');
		    }
		    else {
		      console.log('User added to home screen');
		    }
		  });
		});
	} else {
		//force remove the service worker
		navigator.serviceWorker.getRegistrations().then(function(registrations) {
		 for(let registration of registrations) {
		  registration.unregister()
		} })
	}


	/* ==========================================================================
	// populate categories
	========================================================================== */

	//get data from server
	axios.get(`${SERVER_URL}/articles/type-count`)
	.then((response) => {
		populateTypes(response.data);
	}).catch((err) => {
		console.log('error fetching categories: ', err);
	});

	//populate numbers on page
	function populateTypes(data) {
		for(var i = 0; i < data.length; i++) {
			let el = document.querySelector('[data-' + data[i].categorySlug + ']');
			if(el) {
				el.innerHTML = data[i].count;
			}
		}
	}

})();


$(document).ready(function(){
	/* ==========================================================================
	// body class(front-end, admin)
	========================================================================== */

	$(document.documentElement).addClass(getClassFromUrl());
	
	function getClassFromUrl() {
	  var path = window.location.pathname;

	  switch(path) {
	    case '/':
	      return 'front-end';
	    case '/admin':
	      return 'admin';
	  }
	}

	/* ==========================================================================
	// bowser
	========================================================================== */

	//browsers:
	// safari
	// firefox
	// chrome
	// msedge
	// msie
	// mobile
	// ios

	if (bowser.msedge) {
	  //need this since modernizr doesn't add this one
	  $('body').addClass('msedge');
	}
	if (bowser.safari) {
	  $('body').addClass('safari');
	}
	if (bowser.iPhone) {
	  $('body').addClass('iphone');
	}
	if (bowser.mobile && bowser.safari && bowser.version <= 8) {
	  $('body').addClass('iphone-8-or-less');
	}
	if (bowser.tablet) {
	  $('body').addClass('tablet');
	}
	if (!bowser.tablet && !bowser.mobile) {
	  $('body').addClass('desktop');
	}
	if (bowser.mobile) {
	  $('body').addClass('mobile');
	}

	/* ==========================================================================
	testing
	========================================================================== */

	//media size
	$(window).on('changed.zf.mediaquery', function(event, newSize, oldSize) {
	  // newSize is the name of the now-current breakpoint, oldSize is the previous breakpoint
	  // console.log(newSize);
	});


	/* ==========================================================================
	// gallery
	========================================================================== */


	var galItems = document.querySelectorAll('.gal-item');
	if(galItems && galItems.length !== 0) {
		for(var i = 0; i < galItems.length; i++) {
			//mouse enter events
			galItems[i].addEventListener('mouseenter', (e) => {
				$(e.currentTarget).removeClass('de-activate');
				$(e.currentTarget).addClass('activate');
			});
			galItems[i].addEventListener('mouseleave', (e) => {
				$(e.currentTarget).removeClass('activate');
				$(e.currentTarget).addClass('de-activate');
			});
			//play button events
			galItems[i].querySelector('.icon-play').addEventListener('click', (e) => {
				e.preventDefault();
				initModal(e.currentTarget);
			});
		}
	}

	//modal
	function initModal(trigger) {
		var id = trigger.dataset.modal;

		//load the video
		//(open modal after video load is done)
		loadVideo('#' + id + '-video', openModal);

		function openModal() {
			//open the associated modal
			var modal = document.querySelector('[data-modal]#' + id);
			$(modal).addClass('on');
			modal.querySelector('.close').addEventListener('click', (e) => {
				e.preventDefault();
				//close the modal
				$(modal).removeClass('on');
				//reset the video
				var $vid = $(modal).find('video');
				if($vid[0]) {
					$vid[0].pause();
					$vid[0].currentTime = 0;
				}
			});
		}
	}



	/* ==========================================================================
	// dynamic video loading
	========================================================================== */

	function loadVideo(selector, callback) {
	  if(document.querySelector(selector)) {
	    var $vid = $(selector);

	    if (!$vid[0].src) {
	        //if it doesn't already have a source...
	        //change source of actual video element
	        $vid.each(function() {
	          var pathTovidSrc = $vid.data('src') ? $vid.data('src') : $vid.attr('src');
	          //update the source
	          $vid.attr('src', pathTovidSrc);
	        });

	        //change source of the source elments within
	        $('source[data-src]:not([data-src=""])').each(function(){
	          var $vidSrc = $(this);

	          var pathTovidSrc = $vidSrc.data('src') ? $vidSrc.data('src') : $vidSrc.attr('src');
	          //update the source
	          $vidSrc.attr('src', pathTovidSrc);
	        });
	    }
	    //play the video
	    $vid[0].play();
	  }

	  //give a bit of time for src to async load
	  setTimeout(() => {
	  	callback();
	  }, 100)
	  
	}

});

/* ==========================================================================
mobile menu
========================================================================== */

var mobileMenuOpen = false;

if (document.querySelector(".mobile-menu-button") && document.querySelector(".mobile-menu-container")) {
	var menuButton = document.querySelector(".mobile-menu-button").querySelector(".grid-button");
	var menuHolder = document.querySelector(".mobile-menu-container");

	menuButton.addEventListener('click', function() {

		if(!mobileMenuOpen) {
			//open menu
			TweenLite.to(menuHolder, 0.5, {autoAlpha: 1});
			mobileMenuOpen = true;
		} else {
			//close menu
			TweenLite.to(menuHolder, 0.5, {autoAlpha: 0});
			mobileMenuOpen = false;
		}

		toggleClass(menuButton, 'close');
	});
}

/* ==========================================================================
// 1pixel code
========================================================================== */

// (function ($, window, document, undefined) {
    
//     $.fn.onePixel = function ( options ) {
        
//         //enable all transition effects after page load (.preload class prevents them)
//         $(window).load(function () {
//             $("body").removeClass("preload");
//         });
        
        
//         // // fadein on page load --------------------------------------------------------//
//         // to display loading animation before it's ready
//         $(document).ready(function() {
            
//             //first check if there is a loading container on the page
//             if ( $( ".loading-container" ).length ) {
 
//                 //to show loading animation
//                 $imgloader = $('.loading-container');
//                 $loadingimg = $( '<div id="canvasloader-container" class="onepix-imgloader"></div>' );
                

//     //          $loadingimg.attr("src","images/flexslider/loading.gif");
//                 $imgloader.prepend( $loadingimg );
                
//     //          canvasloader code
//                 var cl = new CanvasLoader('canvasloader-container');
//                 cl.setColor('#ffa937'); // default is '#000000'
//                 cl.setDiameter(45); // default is 40
//                 cl.setDensity(75); // default is 40
//                 cl.setRange(0.7); // default is 1.3
//                 cl.setSpeed(3); // default is 2
//                 cl.setFPS(22); // default is 24
//                 cl.show(); // Hidden by default
                
//                 $(window).load(function () {
//                     $('.onepix-imgloader').fadeOut();
//                     // fade in content (using opacity instead of fadein() so it retains it's height.
//                     //if home slider doesn't exist (else the slider callback handles this)...
//                     if (!$('.homeslider').length) {
//                         fade_in_page();
//                     }

//                 });
            
//             }
                
//         });
        
//         //        used to bind loading for the page and flexslider ()
//         function fade_in_page() {
//             $('.loading-container > *:not(.onepix-imgloader)').fadeTo(8000, 100);
//         }

//         // mobile menu------------------------------------------------------------//
//         $(document).ready(function() {
       
//             // non dropdown select version mobile menu
//             $('#mobile-menu .menu').custom_mobileMenu();
//         });


//         // "stellar" parallax --------------------------------------------------//

//         //the window width threshhold to deactivat stellar
//         var widthThresh = 1550;

//         $(document).ready(function() {
            
//             if ($(window).width() > widthThresh) {
//                 $.stellar({
//                     horizontalScrolling: false,
//                     //responsive: true
                    
//                     //set vertical offset in the data in the element as:
//                     // data-stellar-vertical-offset="-700"
//                     //because it needs to load on the fly if page refresh in mobile mode
//                 });
//             }
//         })

//         $(document).ready(function() {
//             react_to_window();
//         });
        
// //      only activate stellar for window widths above or equal to 1550
//         var stellarActivated = false;
        
//         $(window).resize(function() {
//             react_to_window();
//         });
        
//         function react_to_window() {
//             if ($(window).width() <= widthThresh) {
//                 if (stellarActivated == true) {
//                     $(window).data('plugin_stellar').destroy();
//                     stellarActivated = false;
//                 }
//             } else {
//                 if (stellarActivated == false) {

//                     $.stellar({
//                        horizontalScrolling: false
//                    });
                    
//                     $(window).data('plugin_stellar').init();
//                     stellarActivated = true;
//                 }
//             }
//         }
        
//         //header search form ----------------------------------------------------//

//         //must do this since css won't allow it while controlling the shortcode
//         $(function () {
//             //copy the colour and hover color of the element (set by the shortcode) and apply it to the hover bg
//             $('#searchform #searchclose').click(
//                     function () {
//                        $('#searchform #searchwrap').hide();
//                     });
//             $('#searchform #searchbtn').click(
//                     function () {
//                        $('#searchform #searchwrap').show();
//                     });
                
//         });
        
//         //back to top --------------------------------------------------//

//         $(function() {
//             $(window).scroll(function() {
//                 //important -> height: auto must be set or jquery scrollTop() won't work
//                 if($(this).scrollTop() > 100) {
//                     $('#toTop').fadeIn(3000);
//                 } else {
//                     $('#toTop').fadeOut();
//                 }
//             });
//             $('#toTop').click(function() {
//                 $('html, body').animate(
//                 {
//                     scrollTop:0
//                 },
//                 800,
//                 "easeInOutExpo",
//                 function() {
//                     $('#toTop').fadeOut(1200);
//                 });
//             });
//         });

//     //end $.fn.onePixel = function ( options )
//     }
    
//     // call the plugin (must use body since it will only work when an element is called)
//     $('body').onePixel();

    
// })($, window, document);

// // * ben - non dropdown select version. ----------------//
// (function($) {
// 	$.fn.custom_mobileMenu = function() {
	    
// 	    //attach the down arrow for submenu
// 	    $( "#menu-custom-mobile-menu li" ).has( "ul" ).prepend("<span class='submenu-slide' href='#'><i class='fa fa-angle-down fa-6'></i></span>");

// 	//    $( "h2" ).appendTo( $( ".container" ) );

// 	    /* toggle nav */
// 	    $("#mobile-selector").on("click", function(){
// 	        $("#menu-custom-mobile-menu").slideToggle('fast');
// 	        $(this).toggleClass("active");
// 	    });
	    
// 	    /* toggle submenu items*/
// 	    $("#menu-custom-mobile-menu li span.submenu-slide").on("click", function(){
// 	        $(this).siblings( "ul.sub-menu" ).slideToggle('fast');
// 	    });

// 	};
// })($);

// 	/* ==========================================================================
// 	// manifest
// 	========================================================================== */

// 	window.addEventListener('beforeinstallprompt', function(e) {
// 	  // beforeinstallprompt Event fired

// 	  // e.userChoice will return a Promise. 
// 	  // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
// 	  e.userChoice.then(function(choiceResult) {

// 	    console.log(choiceResult.outcome);

// 	    if(choiceResult.outcome == 'dismissed') {
// 	      console.log('User cancelled home screen install');
// 	    }
// 	    else {
// 	      console.log('User added to home screen');
// 	    }
// 	  });
// 	});

// })();
