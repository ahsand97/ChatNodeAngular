'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Usuarios', {
        nickname:{
          primaryKey: true,
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        nombre:{
          type: Sequelize.STRING,
          allowNull: false
        },
        password:{
          type: Sequelize.STRING,
          allowNull: false
        },
        nombre_sala_FK:{
            type: Sequelize.STRING,
            onDelete: 'CASCADE',
            allowNull: false,
            references:{
              model: 'Salas',
              key: 'nombre'
            }
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Usuarios');
  }
};