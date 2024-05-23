export const weekdays = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

export const initializeDetails = (details: any[]) => {
  let aux = details.map((d: any) => {
    return {
      id: d.id,
      quantity: d.quantity,
      details: d.detail,
      price: d.price,
    };
  });

  const aux2 = [...Array(10 - aux.length)].map(() => {
    return {
      id: null,
      quantity: 0,
      details: "",
      price: 0,
    };
  });

  return aux.concat(aux2);
};
