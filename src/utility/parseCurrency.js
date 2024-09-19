export function parseAmount(value, symbol) {
  const newval = value.replace(new RegExp(`\\${symbol}\\s?|(,*)`, "g"), "");
  return parseFloat(newval);

}
