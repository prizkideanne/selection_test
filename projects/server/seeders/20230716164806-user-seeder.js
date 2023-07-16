"use strict";
const bcrypt = require("bcryptjs");

const generatePassword = async (password) => {
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pass = await generatePassword("Johndoe1!");
    await queryInterface.bulkInsert("Users", [
      {
        email: "john@doe.com",
        password: pass,
        access_token: null,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
