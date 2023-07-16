"use strict";
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
const moment = require("moment");

const generatePassword = async (password) => {
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let usersData = [];
    for (let i = 1; i < 30; i++) {
      const hashedPassword = await generatePassword("Employee1!"); // Await the generatePassword function
      const recent = faker.date.recent(); // Generate a random recent date
      usersData.push({
        id: i + 1,
        email: faker.internet.email(),
        password: hashedPassword,
        access_token: null,
        role_id: 2,
        createdAt: recent,
        updatedAt: recent,
      });
    }
    await queryInterface.bulkInsert("Users", usersData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
