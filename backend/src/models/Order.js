const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  numero_pedido: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.ENUM(
      'aguardando_pagamento',
      'em_processamento',
      'em_analise',
      'concluido',
      'cancelado'
    ),
    defaultValue: 'aguardando_pagamento'
  },
  preco_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  tipo_emissao: {
    type: DataTypes.ENUM('digital', 'impressa'),
    defaultValue: 'digital'
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'orders',
  timestamps: true
});

module.exports = Order;
