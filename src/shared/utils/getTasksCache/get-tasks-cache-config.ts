import { GetTasksQueryVariables } from "../../../GraphQL/Queries/getTasks.query.generated";
import { Task } from "../../graphql/generated/types";
import {
  createTask,
  deleteTask,
  updateTaskList,
} from "./get-tasks-cache-methods";

const createTaskInCache = ({
  data,
  variables,
}: {
  data: Task;
  variables: GetTasksQueryVariables;
}) => {
  createTask(data, variables);
};

const updateTaskListToCache = ({
  data,
  variables,
}: {
  data: Task;
  variables: GetTasksQueryVariables;
}) => {
  updateTaskList(data, variables);
};

const deleteTaskInCache = ({
  data,
  variables,
}: {
  data: { id: string };
  variables: GetTasksQueryVariables;
}) => {
  deleteTask(data, variables);
};

/* const updateIngredientInCache = ({
  data,
  variables,
}: {
  data: IngredientModel
  variables: GetAllModifiersByRestaurantQueryVariables
}) => {
  updateIngredient(data, variables)
}

const updateIngredientListToCache = ({
  data,
  variables,
}: {
  data: PaginatedIngredientModel
  variables: GetAllModifiersByRestaurantQueryVariables
}) => {
  updateIngredientList(data, variables)
}

const deleteIngredientInCache = ({
  data,
  variables,
}: {
  data: { uuid: string }
  variables: GetAllModifiersByRestaurantQueryVariables
}) => {
  deleteIngredient(data, variables)
}

export {
  createIngredientInCache,
  updateIngredientInCache,
  updateIngredientListToCache,
  deleteIngredientInCache,
} */

export { createTaskInCache, deleteTaskInCache, updateTaskListToCache };
