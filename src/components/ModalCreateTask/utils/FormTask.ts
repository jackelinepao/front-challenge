import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PointEstimate, Status } from "../../../shared/graphql/generated/types";

const FormTaskSchema = yup.object().shape({
  name: yup.string().required(),
  dueDate: yup.string().required(),
  pointEstimate: yup.mixed<PointEstimate>().required(),
  tags: yup.array().min(1).required(),
  status: yup.mixed<Status>().required(),
  assigneeId: yup.string().optional(),
});

export const FormTaskResolver = yupResolver(FormTaskSchema);
