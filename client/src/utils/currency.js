// Format price in Indian Rupees
export const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
};

// Convert USD to INR (rough conversion rate: 1 USD = 83 INR)
export const convertToINR = (usdPrice) => {
    return Math.round(usdPrice * 83);
};
