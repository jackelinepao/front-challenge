import {
  GetTasksQuery,
  GetTasksQueryVariables,
} from "../../../GraphQL/Queries/getTasks.query.generated";
import { graphqlClient } from "../../graphql/client";
import { Task } from "../../graphql/generated/types";
import readGetTasksQueryCache from "./get-tasks-cache-read";
import writeGetTasksQueryCache from "./get-tasks-cache-write";

const cache = graphqlClient.cache;

export const createTask = (data: Task, variables: GetTasksQueryVariables) => {
  const getTasksQuery = readGetTasksQueryCache({
    cache,
    variables,
  });

  const tasks = getTasksQuery?.tasks ?? [];

  if (tasks) {
    const taskUpdated = [data, ...tasks];

    const query: GetTasksQuery = {
      tasks: taskUpdated,
    };

    writeGetTasksQueryCache({ cache, query, variables });
  }
};

export const deleteTask = (
  data: { id: string },
  variables: GetTasksQueryVariables
) => {
  const getTasksQuery = readGetTasksQueryCache({
    cache,
    variables,
  });

  const tasks = getTasksQuery?.tasks ?? [];

  if (tasks && data.id) {
    const taskListUpdated = tasks?.filter((task) => task.id !== data.id) ?? [];
    const query: GetTasksQuery = {
      tasks: taskListUpdated,
    };

    writeGetTasksQueryCache({ cache, query, variables });
  }
};

export const updateTaskList = (
  data: Task,
  variables: GetTasksQueryVariables
) => {
  const getTasksQuery = readGetTasksQueryCache({
    cache,
    variables,
  });

  const tasks = getTasksQuery?.tasks ?? [];
console.log(tasks);

  if (tasks) {
    const taskListUpdated = tasks.map((task) =>
      data.id === task.id ? { ...task, ...data } : task
    );
    console.log({ taskListUpdated });

    const taskList: Task[] = [];

    getTasksQuery?.tasks?.forEach((task) => {
      taskList.push(task);
    });

    const query: GetTasksQuery = {
      tasks: taskListUpdated,
    };

    writeGetTasksQueryCache({ cache, query, variables });
  }
};
