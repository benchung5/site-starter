const articleFields = [
	{name: 'article_id', type: 'hiddenField', error: null, condition: null},
	{name: 'name', label: 'name', type: 'input', error: 'Please enter a title', condition: 'required'},
	{name: 'slug', label: 'slug', type: 'input', error: 'Please enter a slug', condition: 'required'},
	{name: 'categories', label: 'categories', type: 'multiSelect', error: null, condition: null},
    {name: 'body', label: 'body', type: 'textarea', error: null, condition: null},
    {name: 'mode_id', label: 'mode', type: 'dropdownSelect', error: null, condition: null},
];

export default articleFields;