import { gql } from "@apollo/client";

// Truy vấn để lấy danh sách người dùng
export const LIST_USERS = gql`
  query {
    listUser {
        id
        age
        name
        email
        role
        pets {
            id
            age
            name
            userId
        }
    }
  }
`;

// Mutation để tạo người dùng mới
export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      age
      email
      role
    }
  }
`;

// Mutation để cập nhật người dùng
export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      age
      email
      role
    }
  }
`;

// Mutation để xóa người dùng
export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      id
      name
      age
      email
      role
    }
  }
`;

// Mutation để hủy người dùng
export const DESTROY_USER = gql`
  mutation DestroyUser($userId: ID!) {
    destroyUser(userId: $userId) {
      id
      name
      age
      email
      role
    }
  }
`;

// Mutation để tạo pet mới
export const CREATE_PET = gql`
  mutation CreatePet($input: CreatePetInput!) {
    createPet(input: $input) {
      id
      age
      name
      userId
    }
  }
`;
