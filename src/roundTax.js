const TAX_ROUND_TO_NEAREST = 0.05;

const taxRoundingFactor = 1 / TAX_ROUND_TO_NEAREST;
const roundTax = number =>
	Math.ceil(number * taxRoundingFactor) / taxRoundingFactor;

module.exports = roundTax;
