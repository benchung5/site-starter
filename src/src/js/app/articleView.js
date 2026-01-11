import scroll from './scroll';

export default function() {
	// Wait for DOM to be ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

	function init() {
		const relatedPostsSection = document.querySelector('.related-posts-section');
		if (!relatedPostsSection) return;

		const relatedPostItems = relatedPostsSection.querySelectorAll('.related-post-item');
		if (relatedPostItems.length === 0) return;

		let animated = false;

		// Scroll trigger to animate items when section comes into view
		scroll.init({el: '.related-posts-section'}, function(inView) {
			if (inView && !animated) {
				animated = true;
				// Animate items one at a time with delays
				relatedPostItems.forEach((item, index) => {
					setTimeout(() => {
						item.style.opacity = '1';
						item.style.transform = 'translateY(0)';
					}, index * 200); // 200ms delay between each item
				});
			}
		});
	}
}
