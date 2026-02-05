import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add item to cart
    const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
        setCartItems(prevItems => {
            // Check if item with same product, size, and color already exists
            const existingItemIndex = prevItems.findIndex(
                item =>
                    item.id === product.id &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor === selectedColor
            );

            if (existingItemIndex > -1) {
                // Update quantity of existing item
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += quantity;
                return updatedItems;
            } else {
                // Add new item
                return [...prevItems, {
                    ...product,
                    selectedSize,
                    selectedColor,
                    quantity,
                    cartItemId: Date.now() + Math.random() // Unique ID for cart item
                }];
            }
        });

        // Show cart sidebar
        setIsCartOpen(true);

        // Show notification
        showNotification('Item added to cart');
    };

    // Remove item from cart
    const removeFromCart = (cartItemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
        showNotification('Item removed from cart');
    };

    // Update item quantity
    const updateQuantity = (cartItemId, newQuantity) => {
        if (newQuantity < 1) return;

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.cartItemId === cartItemId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    // Clear entire cart
    const clearCart = () => {
        setCartItems([]);
        showNotification('Cart cleared');
    };

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal > 8300 ? 0 : 830) : 0;
    const total = subtotal + shipping;
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Simple notification (can be enhanced with a toast library)
    const showNotification = (message) => {
        // This is a simple implementation - you could use a toast library for better UX
        console.log(message);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        shipping,
        total,
        itemCount,
        isCartOpen,
        setIsCartOpen
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
