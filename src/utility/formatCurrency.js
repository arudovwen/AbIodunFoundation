export function formatCurrency(amount, currency = "NGN") {
  // const regionData = JSON.parse(localStorage.getItem("regionData"));

  if (!amount) return "NGN0.00";
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency || "NGN",
    minimumFractionDigits: 0,
  });

  return formatter.format(amount);
}
