#! /usr/bin/env node
const boxen = require("boxen");
const init = require("../src/logHours");
const info = require("../src/info");
const help = require("../src/help");

const params = process.argv.slice(2);

console.log(
	boxen("A tool to help you book your working hours fast", {
		title: `Chalex-timesheet CLI ${require("../package.json").version}`,
		titleAlignment: "center",
		padding: 3,
		borderColor: "green",
		backgroundColor: "black",
	})
);

switch (params[0]) {
	case 'start':
		init();
		break;
	case 'info':
		info();
		break;
	default:
		help();
		break;
}
