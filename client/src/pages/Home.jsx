import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { formatPrice } from '../utils/currency';
import './Home.css';

const Home = () => {
    const { getFeaturedProducts, loading } = useProducts();
    const featuredProducts = getFeaturedProducts();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">MINIMALIST ELEGANCE</h1>
                    <p className="hero-subtitle">Discover timeless pieces that define your style</p>
                    <Link to="/shop">
                        <Button variant="primary" size="lg">Shop Collection</Button>
                    </Link>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <div className="container">
                    <h2 className="section-title">Shop by Category</h2>
                    <div className="categories-grid">
                        <Link to="/shop?category=women" className="category-card">
                            <div className="category-image">
                                <div className="category-overlay">
                                    <h3>Women</h3>
                                </div>
                            </div>
                        </Link>
                        <Link to="/shop?category=men" className="category-card">
                            <div className="category-image">
                                <div className="category-overlay">
                                    <h3>Men</h3>
                                </div>
                            </div>
                        </Link>
                        <Link to="/shop?category=accessories" className="category-card">
                            <div className="category-image">
                                <div className="category-overlay">
                                    <h3>Accessories</h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="featured-section">
                <div className="container">
                    <h2 className="section-title">Featured Products</h2>
                    <div className="products-grid">
                        {featuredProducts.slice(0, 6).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="section-cta">
                        <Link to="/shop">
                            <Button variant="outline" size="lg">View All Products</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="info-section">
                <div className="container">
                    <div className="info-grid">
                        <div className="info-card">
                            <div className="info-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <h3>Premium Quality</h3>
                            <p>Crafted from the finest materials for lasting elegance</p>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                            </div>
                            <h3>Free Shipping</h3>
                            <p>On orders over {formatPrice(500)}, delivered to your door</p>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                            <h3>Easy Returns</h3>
                            <p>30-day return policy for your peace of mind</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
