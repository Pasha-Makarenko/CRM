"use strict"

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date()

    await queryInterface.bulkInsert("users", [
      {
        name: "Admin",
        email: "admin@example.com",
        password: "$2a$05$15kzx1IE61qG3n3B61yxF.2cJN.ci8roh8wHpMMutZKM7PFaLnvsC",
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        name: "Manager",
        email: "manager@example.com",
        password: "$2a$05$15kzx1IE61qG3n3B61yxF.2cJN.ci8roh8wHpMMutZKM7PFaLnvsC",
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        name: "User",
        email: "user@example.com",
        password: "$2a$05$15kzx1IE61qG3n3B61yxF.2cJN.ci8roh8wHpMMutZKM7PFaLnvsC",
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ])

    const users = await queryInterface.sequelize.query("SELECT id FROM Users;")
    const roles = await queryInterface.sequelize.query("SELECT id FROM Roles;")

    const [ userRows ] = users
    const [ roleRows ] = roles

    await queryInterface.bulkInsert("user_roles", [
      { userId: userRows[0].id, roleId: roleRows[0].id },
      { userId: userRows[1].id, roleId: roleRows[1].id },
      { userId: userRows[2].id, roleId: roleRows[2].id }
    ])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {})
    await queryInterface.bulkDelete("user_roles", null, {})
  }
}
