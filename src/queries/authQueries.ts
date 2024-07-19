import { gql } from "@apollo/client";

// Định nghĩa mutation cho đăng nhập
export const LOGIN_MUTATION = gql`
  mutation Login($loginUserInput: LoginUserInput!) {
    login(loginUserInput: $loginUserInput) {
      access_token
      refresh_token
    }
  }
`;

export const GET_USER_FROM_TOKEN = gql`
  query GetUserFromToken($access_token: String!) {
    getUserFromToken(access_token: $access_token) {
      id
      age
      name
      email
      role
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout($userId: String!) {
    logout(userId: $userId)
  }
`;
