import * as Types from '../../shared/graphql/generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateTaskMutationVariables = Types.Exact<{
  input: Types.CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', createdAt: any, dueDate: any, id: string, name: string, pointEstimate: Types.PointEstimate, position: number, status: Types.Status, tags: Array<Types.TaskTag>, assignee?: { __typename?: 'User', avatar?: string | null, createdAt: any, email: string, fullName: string, id: string, type: Types.UserType, updatedAt: any } | null, creator: { __typename?: 'User', avatar?: string | null, createdAt: any, email: string, fullName: string, id: string, type: Types.UserType, updatedAt: any } } };


export const CreateTaskDocument = gql`
    mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    assignee {
      avatar
      createdAt
      email
      fullName
      id
      type
      updatedAt
    }
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
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;