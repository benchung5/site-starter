/* ==========================================================================
header scroll behavior
hides header when scrolling down, shows when scrolling up
========================================================================== */

const headerScroll = function() {
	const header = document.querySelector('#header');
	if (!header) {
		console.warn('Header scroll: #header element not found');
		return;
	}
	
	console.log('Header scroll: Initialized');

	let lastScrollTop = 0;
	let scrollThreshold = 10; // Minimum scroll distance to trigger hide/show
	let ticking = false;

	function handleScroll() {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				const scrollDifference = Math.abs(scrollTop - lastScrollTop);

				// Only trigger if scroll difference is significant enough
				if (scrollDifference < scrollThreshold) {
					ticking = false;
					return;
				}

				// Always show header at the very top
				if (scrollTop <= 0) {
					header.classList.remove('header-hidden');
					header.classList.remove('header-scrolled');
				} else if (scrollTop > lastScrollTop && scrollTop > 100) {
					// Scrolling down - hide header
					header.classList.add('header-hidden');
					header.classList.add('header-scrolled');
				} else if (scrollTop < lastScrollTop) {
					// Scrolling up - show header
					header.classList.remove('header-hidden');
					header.classList.add('header-scrolled');
				} else {
					// Same position or minimal change - maintain current state but update scrolled class
					if (scrollTop > 50) {
						header.classList.add('header-scrolled');
					} else {
						header.classList.remove('header-scrolled');
					}
				}

				lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
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

export default headerScroll;
