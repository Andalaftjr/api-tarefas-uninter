const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderService = sequelize.define('OrderService', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  }
}, {
  tableName: 'order_services',
  timestamps: true
});

module.exports = OrderService;
