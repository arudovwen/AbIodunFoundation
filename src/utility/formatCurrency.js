export function formatCurrency(amount, currency = "NGN") {
  if(!amount) return
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}
