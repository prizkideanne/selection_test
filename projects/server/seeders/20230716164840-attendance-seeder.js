"use strict";
const { faker } = require("@faker-js/faker");
const moment = require("moment");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let attendanceData = [];
    const totalUsers = 30;
    const weekdaysPerUser = 20;
    const monthArray = ["May", "June"]; // Months you want to generate data for
    const recent = faker.date.recent(); // Generate a random recent date

    for (let i = 2; i <= totalUsers; i++) {
      for (let month of monthArray) {
        let date = moment().month(month).startOf("month");
        let weekdaysCount = 0;

        while (weekdaysCount < weekdaysPerUser) {
          if (date.isoWeekday() <= 5) {
            // 1-5 represents weekdays
            let clockIn = moment(date).add(8, "hours").toDate(); // assuming work starts at 8AM
            let clockOut = moment(date).add(17, "hours").toDate(); // assuming work ends at 5PM
            const randomValue = Math.random();
            if (randomValue < 0.5) {
              // 10% chance for no clock_in and no clock_out
              clockIn = null;
              clockOut = null;
            } else if (randomValue < 0.3) {
              // 10% chance for no clock_out
              clockOut = null;
            }

            attendanceData.push({
              user_id: i,
              clock_in: clockIn,
              clock_out: clockOut,
              createdAt: recent,
              updatedAt: recent,
            });
            weekdaysCount++;
          }
          date.add(1, "days");
        }
      }
    }
    await queryInterface.bulkInsert("Attendances", attendanceData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Attendances", null, {});
  },
};
