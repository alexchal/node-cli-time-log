const inquirer = require("inquirer");
const excel = require("exceljs");
const infoQuestions = require("./questions/infoQuestions");

const info = async () => {

    const answers = await inquirer.prompt(infoQuestions);
    let workbook = new excel.Workbook();
    const worksheet = (
        await workbook.xlsx.readFile("LogHours.xlsx")
    ).getWorksheet("LogHours");

    const userDateData = [];
    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
        if (rowNumber > 1) {
            const values = row.values.join(",").split(",");
            if (values[1] === answers.hours) {
                const dataObj = {
                    day: values[1],
                    type: values[2],
                    hours: values[3],
                    comment: values[4],
                };
                userDateData.push(dataObj);
            }
        }
    });

    userDateData.length > 0 ? console.table(userDateData) : console.log(`You haven't log any hours!`);
}

module.exports = info;