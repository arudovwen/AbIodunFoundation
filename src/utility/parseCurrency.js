export function parseAmount(value, symbol) {
  const newval = value.replace(new RegExp(`\\${symbol}\\s?|(,*)`, "g"), "");
  console.log("🚀 ~ parseAmount ~ newval:", newval)
  return parseFloat(newval);

}
