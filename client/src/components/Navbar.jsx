import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const { itemCount, setIsCartOpen } = useCart();
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">
                    <h2>ESSENCE</h2>
                </Link>

                <div className="navbar-links">
                    <Link to="/" className={`navbar-link ${isActive('/')}`}>
                        Home
                    </Link>
                    <Link to="/shop" className={`navbar-link ${isActive('/shop')}`}>
                        Shop
                    </Link>
                    <Link to="/shop?category=men" className={`navbar-link ${isActive('/shop?category=men')}`}>
                        Men
                    </Link>
                    <Link to="/shop?category=women" className={`navbar-link ${isActive('/shop?category=women')}`}>
                        Women
                    </Link>
                    <Link to="/shop?category=accessories" className={`navbar-link ${isActive('/shop?category=accessories')}`}>
                        Accessories
                    </Link>
                </div>

                <div className="navbar-actions">
                    <button
                        className="cart-button"
                        onClick={() => setIsCartOpen(true)}
                        aria-label="Open cart"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        {itemCount > 0 && (
                            <span className="cart-badge">{itemCount}</span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
