const { projectChoices } = require("../config");
const { weekDaysChoices } = require("../utils");

const logQuestions = [
	{
		type: "list",
		name: "day",
		message: "Which day of this week do you want to log?",
		choices: weekDaysChoices(),
	},
	{
		type: "list",
		name: "type",
		message: "What project would you like to add working hours?",
		choices: projectChoices,
	},
	{
		type: "input",
		name: "hours",
		message: "Log your hours please",
		validate: (answer) => {
			if (isNaN(answer)) {
				return "Please enter a number";
			}
			return true;
		},
	},
	{
		type: "input",
		name: "comment",
		message: "Any comment?",
	},
	{
		type: "confirm",
		name: "runAgain",
		message: "Would you like to log your hours again?",
	},
];

module.exports = logQuestions;
