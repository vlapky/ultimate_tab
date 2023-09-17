export const createDateFromId = (groupId: string) => {
  const date = new Date(Number(groupId));

  let dd: string | number = date.getDate();

  let mm: string | number = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  return `${mm}/${dd}/${yyyy}`;
};
