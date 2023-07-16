"use strict";
const { faker } = require("@faker-js/faker");
const moment = require("moment");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let employeeDetailsData = [];
    const recent = faker.date.recent(); // Generate a random recent date
    for (let i = 1; i < 30; i++) {
      employeeDetailsData.push({
        full_name: faker.person.fullName(),
        birth_date: faker.date.past(),
        join_date: faker.date.past(),
        user_id: i + 1,
        salary_id: i,
        createdAt: recent,
        updatedAt: recent,
      });
    }
    await queryInterface.bulkInsert(
      "Employee_details",
      employeeDetailsData,
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Employee_details", null, {});
  },
};
