import type { ApolloCache } from "@apollo/client";

import {
  GetTasksDocument,
  GetTasksQuery,
  GetTasksQueryVariables,
} from "../../../GraphQL/Queries/getTasks.query.generated";

type WriteCacheGetTasksQuery = {
  cache: ApolloCache<unknown>;
  query: GetTasksQuery;
  variables: GetTasksQueryVariables;
};

const writeGetTasksQueryCache = ({
  cache,
  query,
  variables,
}: WriteCacheGetTasksQuery) =>{
  console.log({variables});
  
  cache.writeQuery<GetTasksQuery, GetTasksQueryVariables>({
    query: GetTasksDocument,
    data: query,
    variables,
  });}

export default writeGetTasksQueryCache;
