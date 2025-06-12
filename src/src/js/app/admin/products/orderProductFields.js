const orderProductFields = [
	{name: 'id', type: 'hiddenField', error: null, condition: null},
	{name: 'order_id', type: 'hiddenField', error: null, condition: null},
	{name: 'product_id', label: 'product', type: 'dropdownSelect', error: 'Please select a product', condition: 'required'},
	{name: 'quantity', label: 'quantity', type: 'input', error: 'Please enter a quantity', condition: 'required'},
	
];

export default orderProductFields;