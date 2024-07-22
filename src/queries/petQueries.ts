import { gql } from "@apollo/client";

export const CREATE_PET = gql`
  mutation CreateUser($input: CreatePetInput!) {
    createPet(input: $input) {
      name
      age
      userId
    }
  }
`;
