const { weekDaysChoices } = require("../utils");

const infoQuestions = [
    {
        type: "list",
        name: "hours",
        message: "Which one of the following days you want to see the logging hours?",
        choices: weekDaysChoices(),
    },
];

module.exports = infoQuestions;
