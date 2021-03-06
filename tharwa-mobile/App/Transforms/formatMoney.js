export const formatMoney = (n, c = 2, d = '.', t = ' ') => {
  let j, s, i;
  s = n < 0 ? "-" : "";
  i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c), 10));
  j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
