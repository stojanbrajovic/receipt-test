const roundTax = require("./roundTax");

const SALES_TAX_EXEMPT_ITEM_TYPES = ["book", "food", "medicine"];
const IMPORT_TAX = 0.05;
const SALES_TAX = 0.1;

const getImportTax = item => (item.isImported ? IMPORT_TAX : 0);
const getSalesTax = item =>
	SALES_TAX_EXEMPT_ITEM_TYPES.indexOf(item.type) === -1 ? SALES_TAX : 0;

const getTaxesPaidForItem = item => {
	const salesTax = item.quantity * roundTax(getSalesTax(item) * item.price);
	const importTax = item.quantity * roundTax(getImportTax(item) * item.price);

	return salesTax + importTax;
};

module.exports = getTaxesPaidForItem;
