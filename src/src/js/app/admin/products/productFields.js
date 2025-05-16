const productFields = [
	{name: 'source_id', type: 'hiddenField', error: null, condition: null},
	{name: 'price', label: 'price', type: 'input', error: 'Please enter a price', condition: 'required'},
	{name: 'amount_available', label: 'amount available', type: 'input', error: 'Please enter amount available', condition: 'required'},
	{name: 'status_id', label: 'status', type: 'dropdownSelect', error: 'Please enter a status', condition: 'required'},
	{name: 'product_type_id', label: 'type', type: 'dropdownSelect', error: 'Please enter a type', condition: 'required'},
	{name: 'product_type_variation_id', label: 'variation', type: 'dropdownSelect', error: 'Please enter a variation', condition: 'required'},
];

export default productFields;