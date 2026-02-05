import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import './Shop.css';

const Shop = () => {
    const { filteredProducts, loading, filters, updateFilter, sortBy, setSortBy } = useProducts();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        window.scrollTo(0, 0);

        // Set filters from URL params
        const category = searchParams.get('category');
        if (category) {
            updateFilter('category', category);
        }
    }, [searchParams]);

    const handleCategoryChange = (category) => {
        if (category) {
            setSearchParams({ category });
            updateFilter('category', category);
        } else {
            setSearchParams({});
            updateFilter('category', '');
        }
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="shop-page">
            <div className="container">
                <div className="shop-header">
                    <h1>Shop All Products</h1>
                    <p>{filteredProducts.length} products</p>
                </div>

                <div className="shop-layout">
                    {/* Filters Sidebar */}
                    <aside className="shop-filters">
                        <div className="filter-group">
                            <h3>Category</h3>
                            <div className="filter-options">
                                <label className="filter-option">
                                    <input
                                        type="radio"
                                        name="category"
                                        value=""
                                        checked={filters.category === ''}
                                        onChange={() => handleCategoryChange('')}
                                    />
                                    <span>All</span>
                                </label>
                                <label className="filter-option">
                                    <input
                                        type="radio"
                                        name="category"
                                        value="women"
                                        checked={filters.category === 'women'}
                                        onChange={() => handleCategoryChange('women')}
                                    />
                                    <span>Women</span>
                                </label>
                                <label className="filter-option">
                                    <input
                                        type="radio"
                                        name="category"
                                        value="men"
                                        checked={filters.category === 'men'}
                                        onChange={() => handleCategoryChange('men')}
                                    />
                                    <span>Men</span>
                                </label>
                                <label className="filter-option">
                                    <input
                                        type="radio"
                                        name="category"
                                        value="accessories"
                                        checked={filters.category === 'accessories'}
                                        onChange={() => handleCategoryChange('accessories')}
                                    />
                                    <span>Accessories</span>
                                </label>
                            </div>
                        </div>

                        <div className="filter-group">
                            <h3>Price Range</h3>
                            <div className="price-range-inputs">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={filters.minPrice}
                                    onChange={(e) => updateFilter('minPrice', e.target.value)}
                                />
                                <span>to</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={filters.maxPrice}
                                    onChange={(e) => updateFilter('maxPrice', e.target.value)}
                                />
                            </div>
                        </div>
                    </aside>

                    {/* Products Area */}
                    <div className="shop-content">
                        <div className="shop-toolbar">
                            <div className="sort-dropdown">
                                <label htmlFor="sort">Sort by:</label>
                                <select id="sort" value={sortBy} onChange={handleSortChange}>
                                    <option value="">Default</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="name-asc">Name: A-Z</option>
                                    <option value="name-desc">Name: Z-A</option>
                                </select>
                            </div>
                        </div>

                        {filteredProducts.length === 0 ? (
                            <div className="no-products">
                                <p>No products found matching your filters.</p>
                            </div>
                        ) : (
                            <div className="products-grid">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
