const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

// Get all products with optional filtering
router.get('/', (req, res) => {
    const { category, subcategory, minPrice, maxPrice, size, color, sort, search } = req.query;

    let filteredProducts = [...products];

    // Filter by category
    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    // Filter by subcategory
    if (subcategory) {
        filteredProducts = filteredProducts.filter(p => p.subcategory === subcategory);
    }

    // Filter by price range
    if (minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }

    // Filter by size
    if (size) {
        filteredProducts = filteredProducts.filter(p => p.sizes.includes(size));
    }

    // Filter by color
    if (color) {
        filteredProducts = filteredProducts.filter(p => p.colors.includes(color));
    }

    // Search by name or description
    if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower)
        );
    }

    // Sort products
    if (sort) {
        switch (sort) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }
    }

    res.json(filteredProducts);
});

// Get single product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
});

// Get all categories
router.get('/meta/categories', (req, res) => {
    const categories = [...new Set(products.map(p => p.category))];
    res.json(categories);
});

// Get featured products
router.get('/meta/featured', (req, res) => {
    const featured = products.filter(p => p.featured);
    res.json(featured);
});

module.exports = router;
