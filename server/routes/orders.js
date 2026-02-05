const express = require('express');
const router = express.Router();

// In-memory order storage (in production, this would be a database)
let orders = [];
let orderIdCounter = 1;

// Create a new order
router.post('/', (req, res) => {
    const { items, shippingInfo, paymentInfo, total } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    const order = {
        id: orderIdCounter++,
        items,
        shippingInfo,
        paymentInfo,
        total,
        status: 'confirmed',
        orderDate: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
    };

    orders.push(order);
    res.status(201).json(order);
});

// Get order by ID
router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
});

// Get all orders (for demo purposes)
router.get('/', (req, res) => {
    res.json(orders);
});

module.exports = router;
