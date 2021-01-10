export const formatCurrency = (amount) => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'EUR' });
};
