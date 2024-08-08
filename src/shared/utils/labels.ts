import { TaskTag } from "../graphql/generated/types";

type TaskTagType = `${TaskTag}`;

const getLabel = (value: TaskTagType): string => {
  switch (value) {
    case "ANDROID":
      return "ANDROID";
    case "IOS":
      return "IOS APP";
    case "NODE_JS":
      return "NODE JS";
    case "RAILS":
      return "RAILS";
    default:
      return "REACT";
  }
};

// Generate the pointArray with labels
export const labelArray = Object.values(TaskTag).map((value) => ({
  value,
  label: getLabel(value as TaskTagType),
}));
