'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('wallets', [{
        name: 'coinbase',
        amount: 1,
        created_at: new Date(),
        updated_at: new Date()
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('wallets', null, {});
    }
};
