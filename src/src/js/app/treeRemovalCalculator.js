

export default function() {
	//alert('hello!');
	function submitForm() {
		// create fromdata object from an existing form
		let formData = new FormData(document.querySelector('#tree-removal-form'));

		let treeType = formData.get('tree_type');
		let stemCount = parseInt(formData.get('stem_count')) ;
		let stemLength = parseInt(formData.get('stem_length')) ;
		let stemDiameter = parseFloat(formData.get('stem_diameter'));
		stemDiameter = (stemDiameter > 1) ? (stemDiameter + (stemDiameter / 10)) : stemDiameter;
		let stemAngle = formData.get('stem_angle');
		let crownDensity = formData.get('crown_density');
		let brushRigging = parseFloat(formData.get('brush_rigging'));
		let squareRigging = parseFloat(formData.get('square_rigging'));
		let climbCount = parseInt(formData.get('climb_count')) ;
		let climbHeight = parseInt(formData.get('climb_height')) ;
		let keepingBrush = formData.get('keeping_brush');
		let keepingBigWood = formData.get('keeping_bigwood');
		let easeOfAccess = formData.get('ease_of_access');
		let dragDistance = formData.get('drag_distance');
		let disposalDistance = formData.get('disposal_distance');
		let addedCost = formData.get('added_cost');
		let reducedCost = formData.get('reduced_cost');

		//stems
		let total = stemDiameter * stemLength;
		total = total * treeType;
		let bias = 0.65;
		total = total * bias;
		total = total * stemAngle;
		let stemDiscount = 0;
		total = total +  (total * (squareRigging / 3));

		//crown
		total = total * crownDensity;
		total = total +  (total * (brushRigging / 3));
		
		//stem count
		total = total * stemCount;
		stemDiscount = 	(stemCount > 1) ? total * 0.10 : stemDiscount;
		stemDiscount = stemDiscount * (stemCount - 1);
		total = total - stemDiscount;

		//keeping brush/wood
		total = total * ((keepingBrush == "yes") ? (0.95 - (crownDensity / 20)) : 1);
		total = total * ((keepingBigWood == "yes") ? (0.95 - (stemDiameter / 20)) : 1);

		//access
		total = total * easeOfAccess;
		total = total * dragDistance;
		total = total * disposalDistance;

		//fixed expenses
		let climbcost = climbHeight * 2;
		console.log(climbcost);
		total = total + ((climbCount == 1) ? (climbcost + 50) : ((climbCount * climbcost) + 50));
		total = total + (total * addedCost);
		total = total - (total * reducedCost);

		//total
		total = total || 0;
		totalField.innerHTML = parseInt(total);

		//time
		let hourlyCharge = 175;
		let hours = total / hourlyCharge;
		let days = hours / 8;
		days = Math.round(days * 10) / 10;
		timeField.innerHTML = days + ((days == 1) ? " day" : " days");
	}

	var totalField = document.querySelector('#total');
	var timeField = document.querySelector('#time');

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