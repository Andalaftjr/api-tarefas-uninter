const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Service = require('./Service');
const Order = require('./Order');
const OrderDetail = require('./OrderDetail');
const OrderService = require('./OrderService');

// Define relationships
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Product.hasMany(Order, { foreignKey: 'productId', as: 'orders' });
Order.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

Order.hasMany(OrderDetail, { foreignKey: 'orderId', as: 'details' });
OrderDetail.belongsTo(Order, { foreignKey: 'orderId' });

Order.belongsToMany(Service, { 
  through: OrderService, 
  foreignKey: 'orderId',
  as: 'services'
});
Service.belongsToMany(Order, { 
  through: OrderService, 
  foreignKey: 'serviceId',
  as: 'orders'
});

module.exports = {
  sequelize,
  User,
  Product,
  Service,
  Order,
  OrderDetail,
  OrderService
};
