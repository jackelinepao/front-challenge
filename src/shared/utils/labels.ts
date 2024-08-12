import { TaskTag } from "../graphql/generated/types";

type TaskTagType = `${TaskTag}`;

export const getLabel = (value: TaskTagType) => {
  switch (value) {
    case "ANDROID":
      return { name: "ANDROID", key: "android" };
    case "IOS":
      return { name: "IOS APP", key: "ios" };
    case "NODE_JS":
      return { name: "NODE JS", key: "node" };
    case "RAILS":
      return { name: "RAILS", key: "rails" };
    default:
      return { name: "REACT", key: "react" };
  }
};

// Generate the pointArray with labels
export const labelArray = Object.values(TaskTag).map((value) => ({
  value,
  label: getLabel(value as TaskTagType).name,
}));
