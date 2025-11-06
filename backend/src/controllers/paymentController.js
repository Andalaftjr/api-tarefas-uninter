const { Order } = require('../models');

// @desc    Mock payment checkout
// @route   POST /api/payment/checkout
// @access  Private
exports.checkout = async (req, res, next) => {
  try {
    const { orderId } = req.body;

    // Find order
    const order = await Order.findOne({
      where: { 
        id: orderId,
        userId: req.user.id
      }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido não encontrado.'
      });
    }

    if (order.status !== 'aguardando_pagamento') {
      return res.status(400).json({
        success: false,
        message: 'Este pedido não está aguardando pagamento.'
      });
    }

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update order status
    order.status = 'em_processamento';
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Pagamento processado com sucesso!',
      data: order
    });
  } catch (error) {
    next(error);
  }
};
