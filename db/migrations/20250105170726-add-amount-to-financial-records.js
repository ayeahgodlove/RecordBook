'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('financial_record', 'amount', {
      type: Sequelize.DECIMAL(10, 2), // Adjust type as needed
      allowNull: false,              // Adjust constraints as needed
      defaultValue: 0,               // Optional: Add a default value
    });
    await queryInterface.addColumn('asset', 'value', {
      type: Sequelize.DECIMAL(10, 2), // Adjust type as needed
      allowNull: false,              // Adjust constraints as needed
      defaultValue: 0,               // Optional: Add a default value
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('financial_record', 'amount');
    await queryInterface.removeColumn('asset', 'value');
  }
};
