export const formatDate = (date) => {
  // Check if the date is undefined or null
  if (!date) {
    return "";
  }

  // Create a new Date object from the input date string, treating it as UTC
  const fecha = new Date(date);

  // Get the year, month, and day from the date object
  const anio = fecha.getUTCFullYear(); // Get UTC year
  const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0"); // Get UTC month
  const dia = fecha.getUTCDate().toString().padStart(2, "0"); // Get UTC day

  // Return the formatted date string "YYYY/MM/DD"
  return `${anio}/${mes}/${dia}`;
};
