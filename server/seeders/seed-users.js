"use strict"

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date()
    const password = "$2a$05$15kzx1IE61qG3n3B61yxF.2cJN.ci8roh8wHpMMutZKM7PFaLnvsC"

    await queryInterface.bulkInsert("users", [
      {
        name: "Admin",
        email: "admin@example.com",
        password,
        role: "ADMIN",
        createdAt: timestamp,
        updatedAt: timestamp
      },
      ...new Array(3).fill(0).map((_, i) => ({
        name: `Manager ${i + 1}`,
        email: `manager${i + 1}@example.com`,
        password,
        role: "MANAGER",
        createdAt: timestamp,
        updatedAt: timestamp
      })),
      ...new Array(6).fill(0).map((_, i) => ({
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        password,
        role: "USER",
        createdAt: timestamp,
        updatedAt: timestamp
      }))
    ])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {})
  }
}
