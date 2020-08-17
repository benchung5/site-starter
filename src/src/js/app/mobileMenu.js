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

		menuButton.addEventListener('click', function() {

			if(!mobileMenuOpen) {
				animation.animate(menuHolder, {
					autoOpacity: 1,
					duration: 0.3,
					ease: 'linear',
					onStart: function() {
						menuButtonHolder.style.position = 'fixed';
					},
				})
				mobileMenuOpen = true;
			} else {
				animation.animate(menuHolder, {
					autoOpacity: 0,
					duration: 0.3,
					ease: 'linear',
					onStart: function() {
						menuButtonHolder.style.position = 'absolute';
					}
				})
				mobileMenuOpen = false;
			}

			$(menuButton).toggleClass('close');
		});
	}
}

export default mobileMenu;