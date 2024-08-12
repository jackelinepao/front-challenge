import dayjs from "dayjs";

export const formatDate = (dateString: string) => {
  const inputDate = dayjs(dateString);
  const today = dayjs();
  const yesterday = dayjs().subtract(1, "day");

  if (inputDate.isSame(today, "day")) {
    return {text:"TODAY", className: "today"};
  } else if (inputDate.isSame(yesterday, "day")) {
    return {text: "YESTERDAY", className: "yesterday" };
  } else {
    return {text:inputDate.format("D MMMM, YYYY")};
  }
};
