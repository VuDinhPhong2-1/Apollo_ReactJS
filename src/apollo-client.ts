import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql/", // Địa chỉ GraphQL endpoint của backend
  cache: new InMemoryCache(),
});

export default client;
