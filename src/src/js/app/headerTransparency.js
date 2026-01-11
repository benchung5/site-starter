/* ==========================================================================
header transparency on scroll
========================================================================== */

const headerTransparency = function() {
	const header = document.querySelector('#header');
	if (!header) return;

	const isHomePage = document.body.hasAttribute('data-index');
	let ticking = false;

	function handleScroll() {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				
				if (scrollTop > 50) {
					header.classList.add('header-scrolled');
				} else {
					header.classList.remove('header-scrolled');
				}

				ticking = false;
			});

			ticking = true;
		}
	}

	// Initialize on page load
	window.addEventListener('load', () => {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		if (scrollTop > 50) {
			header.classList.add('header-scrolled');
		}
	});

	// Handle scroll events
	window.addEventListener('scroll', handleScroll, { passive: true });
}

export default headerTransparency;
