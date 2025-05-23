export function formatNumber(num, type = "default") {
  if (isNaN(num)) return "";

  switch (type) {
    case "integer":
        console.log("integer");
      return parseFloat(num).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });

    case "abbreviate":
      const abs = Math.abs(num);
      if (abs >= 1_000_000)
        return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
      if (abs >= 1_000)
        return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
      return num.toString();

    case "default":
    default:
      return parseFloat(num).toLocaleString("en-US");
  }
}
