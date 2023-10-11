'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Breed: {
        type: Sequelize.STRING,
      },
      MinYears: {
        type: Sequelize.INTEGER,
      },
      MaxYears: {
        type: Sequelize.INTEGER,
      },
      Environment: {
        type: Sequelize.STRING,
      },
      Personality: {
        type: Sequelize.TEXT,
      },
      Image: {
        type: Sequelize.STRING,
      },
      Image2: {
        type: Sequelize.STRING,
      },
      Image3: {
        type: Sequelize.STRING,
      },
      Image4: {
        type: Sequelize.STRING,
      },
      Color1: {
        type: Sequelize.STRING,
      },
      Color2: {
        type: Sequelize.STRING,
      },
      Color3: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cats');
  },
};
