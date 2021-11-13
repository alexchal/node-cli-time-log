#! /usr/bin/env node
const boxen = require("boxen");
const init = require("../src/logHours");

if (process.argv.slice(2)[0] !== "start") return;

console.log(
	boxen("A tool to help you book your working hours fast", {
		title: `Chalex-timesheet CLI ${require("../package.json").version}`,
		titleAlignment: "center",
		padding: 3,
		borderColor: "green",
		backgroundColor: "black",
	})
);

init();
