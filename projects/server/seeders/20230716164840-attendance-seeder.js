"use strict";
const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define the start and end dates
    const startDate = new Date("2023-06-01");
    const endDate = new Date("2023-06-30");

    // Prepare the data array
    const attendances = [];

    // Loop over the days of June
    for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
      // Check if the day is a weekday (Mon-Fri)
      if (day.getDay() > 0 && day.getDay() < 6) {
        // Push a new attendance into the data array
        attendances.push({
          user_id: 1,
          clock_in: new Date(day.setHours(9, 0, 0, 0)), // Set the clock_in time to 9am
          clock_out: new Date(day.setHours(17, 0, 0, 0)), // Set the clock_out time to 5pm
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      // Stop if we have already 20 weekdays
      if (attendances.length === 20) {
        break;
      }
    }

    // Bulk insert the generated data
    await queryInterface.bulkInsert("Attendances", attendances);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Attendances", {
      user_id: 1,
      clock_in: {
        [Op.between]: [new Date("2023-06-01"), new Date("2023-06-30")],
      },
    });
  },
};
