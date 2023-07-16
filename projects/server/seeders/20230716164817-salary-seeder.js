"use strict";
const { faker } = require("@faker-js/faker");
const moment = require("moment");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let salaryData = [];
    const recent = faker.date.recent(); // Generate a random recent date
    for (let i = 0; i < 30; i++) {
      salaryData.push({
        basic_salary: faker.number.int({ min: 5000000, max: 25000000 }),
        createdAt: recent,
        updatedAt: recent,
      });
    }
    await queryInterface.bulkInsert("Salaries", salaryData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Salaries", null, {});
  },
};
