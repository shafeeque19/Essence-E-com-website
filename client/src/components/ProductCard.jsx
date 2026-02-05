import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';
import Button from './Button';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAdding(true);
        addToCart(product, selectedSize, selectedColor, 1);

        setTimeout(() => {
            setIsAdding(false);
        }, 500);
    };

    return (
        <Link to={`/product/${product.id}`} className="product-card">
            <div className="product-image-wrapper">
                {product.images && product.images.length > 0 ? (
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="product-card-image"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
                <div className="product-image-placeholder" style={{ display: product.images && product.images.length > 0 ? 'none' : 'flex' }}>
                    <span className="product-category-tag">{product.category}</span>
                </div>
                {!product.inStock && (
                    <div className="product-out-of-stock">Out of Stock</div>
                )}
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{formatPrice(product.price)}</p>

                <div className="product-quick-add">
                    <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        onClick={handleAddToCart}
                        disabled={!product.inStock || isAdding}
                    >
                        {isAdding ? 'Added!' : 'Add to Cart'}
                    </Button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
