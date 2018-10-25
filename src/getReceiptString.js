const getItemTaxes = require("./getItemTaxes");

const NUMBER_OF_DECIMALS = 2;

const format = number => number.toFixed(NUMBER_OF_DECIMALS);

const getSingleItemString = (item, totalPrice) =>
	item.quantity +
	" " +
	(item.isImported ? "imported " : "") +
	item.name +
	": " +
	format(totalPrice);

const getReceiptInfoObject = items => {
	const initialInfo = {
		itemStrings: [],
		totalPrice: 0,
		totalSalesTax: 0
	};

	return items.reduce((result, item) => {
		const tax = getItemTaxes(item);
		const totalPrice = item.quantity * item.price + tax;
		result.itemStrings.push(getSingleItemString(item, totalPrice));

		result.totalPrice += totalPrice;
		result.totalSalesTax += tax;

		return result;
	}, initialInfo);
};

const getReceiptString = items => {
	const receiptInfo = getReceiptInfoObject(items);

	const salesTaxString = `Sales Tax: ${format(receiptInfo.totalSalesTax)}`;
	const totalPriceString = `Total: ${format(receiptInfo.totalPrice)}`;

	return receiptInfo.itemStrings
		.concat([salesTaxString, totalPriceString])
		.join("\n");
};

module.exports = getReceiptString;
