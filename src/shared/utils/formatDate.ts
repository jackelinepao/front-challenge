import dayjs from "dayjs";

export const formatDate = (dateString: string) => {
  const inputDate = dayjs(dateString);
  const today = dayjs();
  const yesterday = dayjs().subtract(1, "day");

  if (inputDate.isSame(today, "day")) {
    return "TODAY";
  } else if (inputDate.isSame(yesterday, "day")) {
    return "YESTERDAY";
  } else {
    return inputDate.format("D MMMM, YYYY");
  }
};
