const fs = require("fs");
const path = require("path");
const del = require("del");

const getReceiptString = require("./getReceiptString");

const INPUT_DIR = path.join(__dirname, "..", "jsonInputs");
const OUTPUT_DIR = path.join(__dirname, "..", "receipts");

const createReceipt = fileName => {
	const filePath = path.join(INPUT_DIR, fileName);
	const items = JSON.parse(fs.readFileSync(filePath));
	const receipt = getReceiptString(items);

	const outputFileName = fileName.split(".")[0] + ".txt";
	const outputPath = path.join(OUTPUT_DIR, outputFileName);
	fs.writeFileSync(outputPath, receipt);
};

del.sync(OUTPUT_DIR);
fs.mkdirSync(OUTPUT_DIR);
const files = fs.readdirSync(INPUT_DIR);
files.forEach(fileName => createReceipt(fileName));
