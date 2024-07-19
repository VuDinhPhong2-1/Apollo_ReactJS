import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ListUsersData } from "../types/userTypes";
import { useQuery } from "@apollo/client";
import { LIST_USERS } from "../queries/userQueries";

const UserTable: React.FC = () => {
  const { data, loading, error } = useQuery<ListUsersData>(LIST_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.listUser.length) {
    return <p>No data available</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name owner</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Pets</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.listUser.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.age}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">
                <ul>
                  {user.pets?.map((pet) => (
                    <li key={pet.id}>
                      {pet.name} (Age: {pet.age})
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
