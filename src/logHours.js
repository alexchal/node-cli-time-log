const inquirer = require("inquirer");
const logQuestions = require("./questions/logQuestions");
const excel = require("exceljs");
const userAnswers = [];

const processData = async (userAnswers) => {
	let workbook = new excel.Workbook();
	const worksheet = (
		await workbook.xlsx.readFile("LogHours.xlsx")
	).getWorksheet("LogHours");
	worksheet.columns = [
		{ header: "Date", key: "day", width: 30 },
		{ header: "Type", key: "type", width: 30 },
		{ header: "Hours", key: "hours", width: 30 },
		{ header: "Comment", key: "comment", width: 30 },
	];

	const existingData = [];
	worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
		if (rowNumber > 1) {
			const values = row.values.join(",").split(",");
			const dataObj = {
				day: values[1],
				type: values[2],
				hours: values[3],
				comment: values[4],
			};

			existingData.push(dataObj);
		}
	});

	existingData.push(...userAnswers);

	const userData = existingData;

	userData.sort((a, b) => {
		return new Date(a.day) - new Date(b.day);
	});

	workbook.removeWorksheet(worksheet.id);

	await generateExcel(userData);
};

const generateExcel = async (data) => {
	let workbook = new excel.Workbook();
	let worksheetNew = workbook.addWorksheet("LogHours");
	worksheetNew.columns = [
		{ header: "Date", key: "day", width: 30 },
		{ header: "Type", key: "type", width: 30 },
		{ header: "Hours", key: "hours", width: 30 },
		{ header: "Comment", key: "comment", width: 30 },
	];

	worksheetNew.addRows(data);

	console.table(data);

	await workbook.xlsx.writeFile("LogHours.xlsx");
};

const init = async () => {
	const data = [];
	const answers = await inquirer.prompt(logQuestions);
	data.push(answers);

	const { day, type, hours, comment } = data[0];
	const userAnswer = {
		day,
		type,
		hours,
		comment,
	};
	userAnswers.push(userAnswer);

	answers.runAgain ? init() : await processData(userAnswers);
};

module.exports = init;
