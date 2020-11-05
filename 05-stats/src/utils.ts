/**
 * @description: takes a European formatted date string and returns a date object
 * @param {string} dateString: date formatted 'DD/MM/YYYY' 
 */
export const dateStringToDate = (dateString: string): Date => {
  const dateParts = dateString
    .split('/')
    .map((value: string): number => {
      return parseInt(value);
    });

  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
};