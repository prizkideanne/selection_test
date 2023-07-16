"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Employee_details", [
      {
        full_name: "John Doe",
        birth_date: new Date(),
        join_date: new Date(),
        user_id: 2,
        salary_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Employee_details", null, {});
  },
};
