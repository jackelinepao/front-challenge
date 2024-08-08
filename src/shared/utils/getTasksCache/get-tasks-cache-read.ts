import type { ApolloCache } from "@apollo/client"
import { GetTasksDocument, GetTasksQuery, GetTasksQueryVariables } from "../../../GraphQL/Queries/getTasks.query.generated"


type ReadCacheGetTasksQuery = {
  cache: ApolloCache<unknown>
  variables: GetTasksQueryVariables
}

const readGetTasksQueryCache = ({
  cache,
  variables,
}: ReadCacheGetTasksQuery) =>
  cache.readQuery<GetTasksQuery, GetTasksQueryVariables>({
    query: GetTasksDocument,
    variables,
  })

export default readGetTasksQueryCache