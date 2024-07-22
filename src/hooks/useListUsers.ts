import { useQuery } from "@apollo/client";
import { LIST_USERS } from "../queries/userQueries";
import { ListUsersData } from "../types/userTypes";

const useListUsers = () => {
  const { data, loading, error } = useQuery<ListUsersData>(LIST_USERS);

  return { data, loading, error };
};

export default useListUsers;
