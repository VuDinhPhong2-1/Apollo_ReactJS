import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER, LIST_USERS } from "../queries/userQueries";
import { CreateUserData, CreateUserVars } from "../types/userTypes";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Snackbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateUserPage: React.FC = () => {
  const navigate = useNavigate();
  const [createUser] = useMutation<CreateUserData, CreateUserVars>(CREATE_USER);
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const handleCreateUser = async () => {
    try {
      await createUser({
        variables: {
          input: { name, password, email, age: parseInt(age, 10) },
        },
        refetchQueries: [{ query: LIST_USERS }], // refetch data list user for homepage
      });
      navigate("/");
    } catch (error) {
      setMessage("Created user failed. Please check your credentials.");
      setOpenSnackbar(true);
    }
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          border: "solid",
          width: "500px",
          height: "fit-content",
          paddingBottom: "100px",
        }}
      >
        <Typography variant="h3"> Create User</Typography>
        <FormControl variant="standard" sx={{ width: "350px" }}>
          <InputLabel htmlFor="input-username">User Full Name</InputLabel>
          <Input
            id="input-username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        {/* Add similar FormControl components for password, email, and age */}
        <FormControl variant="standard" sx={{ width: "350px" }}>
          <InputLabel htmlFor="input-password">Password</InputLabel>
          <Input
            id="input-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ width: "350px" }}>
          <InputLabel htmlFor="input-email">Email</InputLabel>
          <Input
            id="input-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ width: "350px" }}>
          <InputLabel htmlFor="input-age">Age</InputLabel>
          <Input
            id="input-age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </FormControl>
        <Button variant="contained" onClick={handleCreateUser}>
          Create
        </Button>
      </Box>
      {/* Snackbar for error notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateUserPage;
