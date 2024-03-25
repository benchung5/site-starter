import animation from './animation';
import scroll from './scroll';

export default function() {
	//hero animation
	const header = document.querySelector('#hero .content-container');
	const slideInAnimation = animation.init(header, {
		duration: 1.5,
		ease: 'ease-in-out',
		propertyTo: [
			['transform', 'translateX(0)'],
			['opacity', '1']
		]
	});
	slideInAnimation.animate();

	//scroll in animation
	scroll.init({el: '.services-row'}, inView);

	const actionItemOne = document.querySelector('.buttons-anim-one');
	const buttonAnimationOne = animation.init(actionItemOne, {
		duration: 1,
		ease: 'ease-in-out',
		propertyTo: [
			['transform', 'translateX(0)'],
			['opacity', '1']
		]
	});

	const actionItemTwo = document.querySelector('.buttons-anim-two');
	const buttonAnimationTwo = animation.init(actionItemTwo, {
		duration: 1,
		ease: 'ease-in-out',
		propertyTo: [
			['transform', 'translateX(0)'],
			['opacity', '1']
		]
	});

	let animated = false;
	function inView(inView) {
		if(inView && (animated == false)) {
			animated = true;
			buttonAnimationOne.animate();
			buttonAnimationTwo.animate();
		}
	}
}
