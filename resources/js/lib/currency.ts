export function formatCurrency(n: number | string) {
    const num = typeof n === 'string' ? parseFloat(n) : n || 0;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(num);
}
