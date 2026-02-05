import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within ProductProvider');
    }
    return context;
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filters
    const [filters, setFilters] = useState({
        category: '',
        subcategory: '',
        minPrice: '',
        maxPrice: '',
        size: '',
        color: '',
        search: ''
    });

    const [sortBy, setSortBy] = useState('');

    // Fetch all products
    useEffect(() => {
        fetchProducts();
    }, []);

    // Apply filters and sorting when they change
    useEffect(() => {
        applyFiltersAndSort();
    }, [products, filters, sortBy]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
            const response = await fetch(`${apiUrl}/api/products`);
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data);
            setFilteredProducts(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const applyFiltersAndSort = () => {
        let result = [...products];

        // Apply filters
        if (filters.category) {
            result = result.filter(p => p.category === filters.category);
        }

        if (filters.subcategory) {
            result = result.filter(p => p.subcategory === filters.subcategory);
        }

        if (filters.minPrice) {
            result = result.filter(p => p.price >= parseFloat(filters.minPrice));
        }

        if (filters.maxPrice) {
            result = result.filter(p => p.price <= parseFloat(filters.maxPrice));
        }

        if (filters.size) {
            result = result.filter(p => p.sizes.includes(filters.size));
        }

        if (filters.color) {
            result = result.filter(p => p.colors.includes(filters.color));
        }

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower)
            );
        }

        // Apply sorting
        if (sortBy) {
            switch (sortBy) {
                case 'price-asc':
                    result.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    result.sort((a, b) => b.price - a.price);
                    break;
                case 'name-asc':
                    result.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-desc':
                    result.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                default:
                    break;
            }
        }

        setFilteredProducts(result);
    };

    const updateFilter = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };

    const resetFilters = () => {
        setFilters({
            category: '',
            subcategory: '',
            minPrice: '',
            maxPrice: '',
            size: '',
            color: '',
            search: ''
        });
        setSortBy('');
    };

    const getProductById = (id) => {
        return products.find(p => p.id === parseInt(id));
    };

    const getFeaturedProducts = () => {
        return products.filter(p => p.featured);
    };

    const value = {
        products,
        filteredProducts,
        loading,
        error,
        filters,
        sortBy,
        updateFilter,
        setSortBy,
        resetFilters,
        getProductById,
        getFeaturedProducts,
        fetchProducts
    };

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
