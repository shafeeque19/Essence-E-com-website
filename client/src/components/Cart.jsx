import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';
import Button from './Button';
import './Cart.css';

const Cart = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        subtotal,
        shipping,
        total,
        isCartOpen,
        setIsCartOpen,
        itemCount
    } = useCart();

    if (!isCartOpen) return null;

    return (
        <>
            <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
            <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>Shopping Cart ({itemCount})</h2>
                    <button
                        className="cart-close"
                        onClick={() => setIsCartOpen(false)}
                        aria-label="Close cart"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <div className="cart-empty">
                        <p>Your cart is empty</p>
                        <Button onClick={() => setIsCartOpen(false)}>Continue Shopping</Button>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div key={item.cartItemId} className="cart-item">
                                    <div className="cart-item-image">
                                        <div className="product-image-placeholder-small"></div>
                                    </div>

                                    <div className="cart-item-details">
                                        <h3>{item.name}</h3>
                                        <p className="cart-item-meta">
                                            Size: {item.selectedSize} | Color: {item.selectedColor}
                                        </p>
                                        <p className="cart-item-price">{formatPrice(item.price)}</p>

                                        <div className="cart-item-actions">
                                            <div className="quantity-controls">
                                                <button
                                                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    aria-label="Decrease quantity"
                                                >
                                                    −
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                                    aria-label="Increase quantity"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                className="cart-item-remove"
                                                onClick={() => removeFromCart(item.cartItemId)}
                                                aria-label="Remove item"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <div className="cart-summary-row">
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="cart-summary-row">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                            </div>
                            {shipping > 0 && subtotal < 8300 && (
                                <p className="cart-free-shipping-note">
                                    Add {formatPrice(8300 - subtotal)} more for free shipping!
                                </p>
                            )}
                            <div className="cart-summary-row cart-total">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>

                            <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                                <Button variant="primary" fullWidth size="lg">
                                    Proceed to Checkout
                                </Button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Cart;
