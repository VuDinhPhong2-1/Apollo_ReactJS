import React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../queries/userQueries";
import { CreateUserData, CreateUserVars } from "../types/userTypes";

const CreateUser: React.FC = () => {
  const [createUser] = useMutation<CreateUserData, CreateUserVars>(CREATE_USER);

  const handleCreate = () => {
    createUser({
      variables: {
        input: {
          name: "John Doe",
          age: 30,
          email: "john@example.com",
          password: "password123",
        },
      },
    });
  };

  return <button onClick={handleCreate}>Create User</button>;
};

export default CreateUser;
