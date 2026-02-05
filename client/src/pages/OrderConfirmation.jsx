import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/Button';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Fetch order details
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        fetch(`${apiUrl}/api/orders/${orderId}`)
            .then(res => res.json())
            .then(data => {
                setOrder(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching order:', err);
                setLoading(false);
            });
    }, [orderId]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="loading-container">
                <p>Order not found</p>
                <Link to="/shop">
                    <Button>Continue Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="order-confirmation-page">
            <div className="container">
                <div className="confirmation-content">
                    <div className="success-icon">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </div>

                    <h1>Order Confirmed!</h1>
                    <p className="confirmation-message">
                        Thank you for your order. We've sent a confirmation email to {order.shippingInfo.email}
                    </p>

                    <div className="order-details-card">
                        <div className="order-header">
                            <div>
                                <h2>Order #{order.id}</h2>
                                <p className="order-date">
                                    {new Date(order.orderDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div className="order-total">
                                ${order.total.toFixed(2)}
                            </div>
                        </div>

                        <div className="order-section">
                            <h3>Shipping Address</h3>
                            <p>
                                {order.shippingInfo.firstName} {order.shippingInfo.lastName}<br />
                                {order.shippingInfo.address}<br />
                                {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}<br />
                                {order.shippingInfo.country}
                            </p>
                        </div>

                        <div className="order-section">
                            <h3>Order Items</h3>
                            <div className="order-items">
                                {order.items.map(item => (
                                    <div key={item.cartItemId} className="order-item">
                                        <div className="order-item-details">
                                            <p className="order-item-name">{item.name}</p>
                                            <p className="order-item-meta">
                                                Size: {item.selectedSize} | Color: {item.selectedColor} | Qty: {item.quantity}
                                            </p>
                                        </div>
                                        <p className="order-item-price">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="order-section">
                            <h3>Estimated Delivery</h3>
                            <p>
                                {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>

                    <div className="confirmation-actions">
                        <Link to="/shop">
                            <Button variant="primary" size="lg">Continue Shopping</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
