import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const API_URL = import.meta.env.VITE_API_URL;

const httpLink = createHttpLink({
  uri: API_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoiUmVhY3QgTmVyZGVyeSIsInByb2plY3RJZCI6IjI1ZDBmZGYzLWIyMWYtNGY5MC04YmVjLTVjNTVhYzI2NDc3NSIsImZ1bGxOYW1lIjoiSmFjcXVlbGluZSBRdWlzcGUiLCJlbWFpbCI6ImphY2tlbGluZXF1aXNwZUByYXZuLmNvIiwiaWF0IjoxNzIyMjY5MjI4fQ.2SqYS6cLB_Ch8n3eBnfRQXwmRR3VUJFMHqiI41ZQrUw";
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const graphqlClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
    typePolicies: {
      Query: {
        fields: {
          tasks: {
            merge: false,
          },
        },
      },
    },
  }),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
    watchQuery: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
  },
});
