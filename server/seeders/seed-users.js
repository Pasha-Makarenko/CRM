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
        createdAt: timestamp,
        updatedAt: timestamp
      },
      ...new Array(3).fill(0).map((_, i) => ({
        name: `Manager ${i + 1}`,
        email: `manager${i + 1}@example.com`,
        password,
        createdAt: timestamp,
        updatedAt: timestamp
      })),
      ...new Array(6).fill(0).map((_, i) => ({
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        password,
        createdAt: timestamp,
        updatedAt: timestamp
      }))
    ])

    const users = await queryInterface.sequelize.query("SELECT id FROM Users;")
    const roles = await queryInterface.sequelize.query("SELECT id FROM Roles;")

    const [ userRows ] = users
    const [ roleRows ] = roles

    const roleIndex = i => {
      if (i === 0) return 0
      if (i <= 3) return 1
      return 2
    }

    await queryInterface.bulkInsert(
      "user_roles",
      new Array(10).fill(0).map((_, i) => ({
        userId: userRows[i].id,
        roleId: roleRows[roleIndex(i)].id
      }))
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {})
    await queryInterface.bulkDelete("user_roles", null, {})
  }
}
