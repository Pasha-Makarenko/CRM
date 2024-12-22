"use strict"

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date()

    await queryInterface.bulkInsert("roles", [
      {
        value: "ADMIN",
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        value: "MANAGER",
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        value: "USER",
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {})
  }
}
