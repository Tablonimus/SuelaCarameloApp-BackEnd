export const ordenarFechas = (a, b) => {
  const fechaA = Date.parse(a.date);
  const fechaB = Date.parse(b.date);
  return fechaA - fechaB;
};
