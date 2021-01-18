export const formatCurrency = (amount) => {
    return amount.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};
