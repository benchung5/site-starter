export function getCartTotals(cart) {
	
	let totalObj = {};
	let totalCount = 0;
	let totalCost = 0;

	cart.map((item) => {
		const subtotal = parseInt(item.price) * parseInt(item.quantity);
		totalCost = totalCost + subtotal;
		totalCount = totalCount + parseInt(item.quantity);
	});



	//total quantity alltogether
	totalObj.totalCount = totalCount;
	//total cost alltogether
	totalObj.totalCost = totalCost;

	// { count, total }
	return totalObj
}

export function formatPrice(centsInt, showCurrancy) {
	let dollars = centsInt / 100;

	// Format the price above to USD using the locale, style, and currency.
	let opts = {};

	opts.style = 'currency';
	opts.currency = showCurrancy ? 'CAD' : 'USD';

	let CADDollar = new Intl.NumberFormat('en-US', opts);
	return CADDollar.format(dollars);
}