import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, subtotal, shipping, total, clearCart } = useCart();

    const [formData, setFormData] = useState({
        // Shipping Info
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        // Payment Info (mock - not actual payment processing)
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });

    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review

    useEffect(() => {
        window.scrollTo(0, 0);
        if (cartItems.length === 0) {
            navigate('/shop');
        }
    }, [cartItems, navigate]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();

        // Mock order submission
        const order = {
            items: cartItems,
            shippingInfo: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
                country: formData.country
            },
            paymentInfo: {
                cardLast4: formData.cardNumber.slice(-4)
            },
            total
        };

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
            const response = await fetch(`${apiUrl}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            });

            if (response.ok) {
                const orderData = await response.json();
                clearCart();
                navigate(`/order-confirmation/${orderData.id}`);
            }
        } catch (error) {
            console.error('Order submission error:', error);
            alert('There was an error processing your order. Please try again.');
        }
    };

    if (cartItems.length === 0) {
        return null;
    }

    return (
        <div className="checkout-page">
            <div className="container">
                <h1>Checkout</h1>

                <div className="checkout-layout">
                    <div className="checkout-form">
                        {/* Progress Steps */}
                        <div className="checkout-steps">
                            <div className={`step ${step >= 1 ? 'active' : ''}`}>
                                <span className="step-number">1</span>
                                <span className="step-label">Shipping</span>
                            </div>
                            <div className={`step ${step >= 2 ? 'active' : ''}`}>
                                <span className="step-number">2</span>
                                <span className="step-label">Payment</span>
                            </div>
                            <div className={`step ${step >= 3 ? 'active' : ''}`}>
                                <span className="step-number">3</span>
                                <span className="step-label">Review</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmitOrder}>
                            {/* Step 1: Shipping Information */}
                            {step === 1 && (
                                <div className="form-section">
                                    <h2>Shipping Information</h2>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>First Name *</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Last Name *</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group full-width">
                                            <label>Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group full-width">
                                            <label>Phone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group full-width">
                                            <label>Address *</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>City *</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>State *</label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Zip Code *</label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Country *</label>
                                            <input
                                                type="text"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-actions">
                                        <Button type="button" variant="primary" onClick={() => setStep(2)}>
                                            Continue to Payment
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Payment Information */}
                            {step === 2 && (
                                <div className="form-section">
                                    <h2>Payment Information</h2>
                                    <div className="form-grid">
                                        <div className="form-group full-width">
                                            <label>Card Number *</label>
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                placeholder="1234 5678 9012 3456"
                                                maxLength="16"
                                                required
                                            />
                                        </div>
                                        <div className="form-group full-width">
                                            <label>Name on Card *</label>
                                            <input
                                                type="text"
                                                name="cardName"
                                                value={formData.cardName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Expiry Date *</label>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                value={formData.expiryDate}
                                                onChange={handleInputChange}
                                                placeholder="MM/YY"
                                                maxLength="5"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>CVV *</label>
                                            <input
                                                type="text"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                placeholder="123"
                                                maxLength="3"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-actions">
                                        <Button type="button" variant="outline" onClick={() => setStep(1)}>
                                            Back
                                        </Button>
                                        <Button type="button" variant="primary" onClick={() => setStep(3)}>
                                            Review Order
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Review Order */}
                            {step === 3 && (
                                <div className="form-section">
                                    <h2>Review Your Order</h2>
                                    <div className="review-section">
                                        <h3>Shipping Address</h3>
                                        <p>
                                            {formData.firstName} {formData.lastName}<br />
                                            {formData.address}<br />
                                            {formData.city}, {formData.state} {formData.zipCode}<br />
                                            {formData.country}
                                        </p>
                                    </div>
                                    <div className="review-section">
                                        <h3>Payment Method</h3>
                                        <p>Card ending in {formData.cardNumber.slice(-4)}</p>
                                    </div>
                                    <div className="form-actions">
                                        <Button type="button" variant="outline" onClick={() => setStep(2)}>
                                            Back
                                        </Button>
                                        <Button type="submit" variant="primary">
                                            Place Order
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary">
                        <h2>Order Summary</h2>
                        <div className="summary-items">
                            {cartItems.map(item => (
                                <div key={item.cartItemId} className="summary-item">
                                    <div className="summary-item-details">
                                        <p className="summary-item-name">{item.name}</p>
                                        <p className="summary-item-meta">
                                            {item.selectedSize} | {item.selectedColor} | Qty: {item.quantity}
                                        </p>
                                    </div>
                                    <p className="summary-item-price">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="summary-totals">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Add missing import
import { useEffect } from 'react';

export default Checkout;
