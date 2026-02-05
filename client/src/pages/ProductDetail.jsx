import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';
import Button from '../components/Button';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getProductById } = useProducts();
    const { addToCart } = useCart();

    const product = getProductById(id);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (product) {
            setSelectedSize(product.sizes[0]);
            setSelectedColor(product.colors[0]);
        }
    }, [product]);

    if (!product) {
        return (
            <div className="loading-container">
                <p>Product not found</p>
                <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, selectedSize, selectedColor, quantity);
    };

    return (
        <div className="product-detail-page">
            <div className="container">
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Back
                </button>

                <div className="product-detail-layout">
                    <div className="product-images">
                        <div className="main-image">
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={product.images[selectedImageIndex]}
                                    alt={product.name}
                                    className="product-main-image"
                                />
                            ) : (
                                <div className="product-image-placeholder-large"></div>
                            )}
                        </div>
                        {product.images && product.images.length > 1 && (
                            <div className="image-thumbnails">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                                        onClick={() => setSelectedImageIndex(index)}
                                    >
                                        <img src={img} alt={`${product.name} ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="product-details">
                        <h1>{product.name}</h1>
                        <p className="product-price">{formatPrice(product.price)}</p>

                        <div className="product-description">
                            <p>{product.description}</p>
                        </div>

                        <div className="product-options">
                            <div className="option-group">
                                <label>Size</label>
                                <div className="size-options">
                                    {product.sizes.map(size => (
                                        <button
                                            key={size}
                                            className={`size-button ${selectedSize === size ? 'active' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="option-group">
                                <label>Color</label>
                                <div className="color-options">
                                    {product.colors.map(color => (
                                        <button
                                            key={color}
                                            className={`color-button ${selectedColor === color ? 'active' : ''}`}
                                            onClick={() => setSelectedColor(color)}
                                            title={color}
                                        >
                                            <span className="color-name">{color}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="option-group">
                                <label>Quantity</label>
                                <div className="quantity-selector">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                                        −
                                    </button>
                                    <span>{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)}>
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="product-actions">
                            <Button
                                variant="primary"
                                size="lg"
                                fullWidth
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                            >
                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                        </div>

                        <div className="product-info-details">
                            <div className="info-item">
                                <span className="info-label">Category:</span>
                                <span>{product.category}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Availability:</span>
                                <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
