import animation from './animation';

const mobileMenu = function() {
	/* ==========================================================================
	mobile menu
	========================================================================== */

	var mobileMenuOpen = false;

	var menuButtonHolder = document.querySelector(".mobile-menu-button");
	var menuHolder = document.querySelector(".mobile-menu-container");

	if (menuButtonHolder && menuHolder) {
		var menuButton = menuButtonHolder.querySelector(".grid-button");

		const fadeInAnimation = animation.init(menuHolder, {
			propertyTo: [['opacity', '1']],
			duration: 0.3,
			ease: 'linear',
			onStart: function() {
				menuButtonHolder.style.position = 'fixed';
				menuHolder.style.visibility = 'visible';
			},
		});
		const fadeOutAnimation = animation.init(menuHolder, {
			propertyTo: [['opacity', '0']],
			duration: 0.3,
			ease: 'linear',
			onStart: function() {
				menuButtonHolder.style.position = 'absolute';
			},
			onEnd: function() {
				menuHolder.style.visibility = 'hidden';
			}
		})

		menuButton.addEventListener('click', function() {
			if(!mobileMenuOpen) {
				fadeInAnimation.animate();
				mobileMenuOpen = true;
			} else {
				fadeOutAnimation.animate();
				mobileMenuOpen = false;
			}

			$(menuButton).toggleClass('close');
		});
	}
}

export default mobileMenu;