"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(
      "category",
      {
        cid: {
          type: Sequelize.INTEGER("tiny"),
          primaryKey: true,
          allowNull: false,
        },
        cname: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("category");
  },
};
