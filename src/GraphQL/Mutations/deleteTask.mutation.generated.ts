import * as Types from '../../shared/graphql/generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteTaskMutationVariables = Types.Exact<{
  input: Types.DeleteTaskInput;
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: { __typename?: 'Task', createdAt: any, dueDate: any, id: string, name: string, pointEstimate: Types.PointEstimate, position: number, status: Types.Status, tags: Array<Types.TaskTag>, creator: { __typename?: 'User', avatar?: string | null, createdAt: any, email: string, fullName: string, id: string, type: Types.UserType, updatedAt: any }, assignee?: { __typename?: 'User', avatar?: string | null, createdAt: any, email: string, fullName: string, id: string, type: Types.UserType, updatedAt: any } | null } };


export const DeleteTaskDocument = gql`
    mutation DeleteTask($input: DeleteTaskInput!) {
  deleteTask(input: $input) {
    createdAt
    creator {
      avatar
      createdAt
      email
      fullName
      id
      type
      updatedAt
    }
    dueDate
    id
    name
    pointEstimate
    position
    status
    tags
    assignee {
      avatar
      createdAt
      email
      fullName
      id
      type
      updatedAt
    }
  }
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;