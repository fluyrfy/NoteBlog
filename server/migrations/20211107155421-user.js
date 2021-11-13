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
      "user",
      {
        uid: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        uname: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        upwd: {
          type: Sequelize.STRING(32),
          allowNull: false,
        },
        avatar: {
          type: Sequelize.STRING(300),
        },
        selfintro: {
          type: Sequelize.STRING(100),
        },
        ctime: {
          type: "TIMESTAMP",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        permission: {
          type: Sequelize.BOOLEAN,
          defaultValue: 0,
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
    await queryInterface.dropTable("users");
  },
};
