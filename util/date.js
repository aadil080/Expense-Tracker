export function getFormattedDate(date) {
  // toISOString() is used to print date in YYYY-MM-DD Format. .slice() is used to print date upto selected digits of date.
  return date.toISOString().slice(0, 10);
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
