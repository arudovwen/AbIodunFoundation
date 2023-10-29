export function formatCurrency(amount, currency = "NGN") {
  if(!amount) return "₦0.00"
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  });

  return formatter.format(amount);
}
