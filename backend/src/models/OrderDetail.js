const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderDetail = sequelize.define('OrderDetail', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  campo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  valor: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'order_details',
  timestamps: true
});

module.exports = OrderDetail;
