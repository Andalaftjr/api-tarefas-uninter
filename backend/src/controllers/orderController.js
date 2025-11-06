const { Order, OrderDetail, OrderService, Product, Service, User } = require('../models');

// Generate unique order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `COB${timestamp.slice(-8)}${random}`;
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    const {
      productId,
      tipo_emissao,
      servicesIds,
      detalhes,
      observacoes
    } = req.body;

    // Validate product
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado.'
      });
    }

    // Calculate total price
    let preco_total = parseFloat(product.preco_base);

    // Add services prices
    if (servicesIds && servicesIds.length > 0) {
      const services = await Service.findAll({
        where: { id: servicesIds }
      });
      services.forEach(service => {
        preco_total += parseFloat(service.preco);
      });
    }

    // Create order
    const order = await Order.create({
      numero_pedido: generateOrderNumber(),
      userId: req.user.id,
      productId,
      tipo_emissao,
      preco_total,
      observacoes,
      status: 'aguardando_pagamento'
    });

    // Add order details
    if (detalhes && typeof detalhes === 'object') {
      const detailsPromises = Object.entries(detalhes).map(([campo, valor]) => {
        return OrderDetail.create({
          orderId: order.id,
          campo,
          valor: typeof valor === 'object' ? JSON.stringify(valor) : valor
        });
      });
      await Promise.all(detailsPromises);
    }

    // Add services to order
    if (servicesIds && servicesIds.length > 0) {
      const servicesPromises = servicesIds.map(serviceId => {
        return OrderService.create({
          orderId: order.id,
          serviceId
        });
      });
      await Promise.all(servicesPromises);
    }

    // Fetch complete order with associations
    const completeOrder = await Order.findByPk(order.id, {
      include: [
        { model: Product, as: 'product' },
        { model: OrderDetail, as: 'details' },
        { model: Service, as: 'services' }
      ]
    });

    res.status(201).json({
      success: true,
      data: completeOrder
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user orders
// @route   GET /api/orders/my
// @access  Private
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [
        { model: Product, as: 'product' },
        { model: OrderDetail, as: 'details' },
        { model: Service, as: 'services' }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id
      },
      include: [
        { model: Product, as: 'product' },
        { model: OrderDetail, as: 'details' },
        { model: Service, as: 'services' }
      ]
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido não encontrado.'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};
