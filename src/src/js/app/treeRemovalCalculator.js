

export default function() {
	//alert('hello!');
	function submitForm() {
		// create fromdata object from an existing form
		let formData = new FormData(document.querySelector('#tree-removal-form'));

		let treeType = formData.get('tree_type');
		let stemCount = parseInt(formData.get('stem_count')) ;
		let stemLength = parseInt(formData.get('stem_length')) ;
		let stemDiameter = parseFloat(formData.get('stem_diameter'));
		let stemDiameterExponental = stemDiameter + (stemDiameter / 10);
		let stemAngle = formData.get('stem_angle');
		let crownDensity = formData.get('crown_density');
		let brushRigging = parseFloat(formData.get('brush_rigging'));
		let squareRigging = parseFloat(formData.get('square_rigging'));
		let climbCount = parseInt(formData.get('climb_count')) ;

		let total = stemDiameterExponental * stemLength;
		total = total * treeType;
		total = total * stemAngle;
		let stemDiscount = 0;
		total = total +  (total * (squareRigging / 2));

		total = total * crownDensity;
		total = total +  (total * (brushRigging / 2));
		
		total = total * stemCount;
		stemDiscount = 	(stemCount > 1) ? total * 0.10 : stemDiscount;
		stemDiscount = stemDiscount * (stemCount - 1);
		total = total - stemDiscount;

		console.log(((climbCount == 1) ? (climbCount * 200) : (((climbCount - 1) * 125) + 200)));

		total = total + ((climbCount == 1) ? (climbCount * 200) : (((climbCount - 1) * 125) + 200));

		total = total || 0;

		totalField.innerHTML = parseInt(total);

	}



	var totalField = document.querySelector('#total');

	let form = document.querySelector('#tree-removal-form');
	form.addEventListener('submit', () => { e.preventDefault(); submitForm(); });
	//submit form on initial page load
	submitForm();

	let formFields = document.querySelector('#form-fields');
	//bubble the event down to it's fields
	formFields.addEventListener('change', () => { submitForm(); }, true);

	let inputFields = formFields.querySelectorAll('input');
	inputFields.forEach((item, index) => {
	  //fire submit while typing in the input fields	
	  item.addEventListener('input', () => { submitForm(); }, false);
	});
}