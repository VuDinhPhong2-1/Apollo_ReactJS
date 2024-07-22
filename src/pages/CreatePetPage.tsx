import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PET, LIST_USERS } from "../queries/userQueries";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CreatePetData, CreatePetVars } from "../types/petTypes";
import { ListUsersData } from "../types/userTypes";

const CreatePetPage: React.FC = () => {
  const navigate = useNavigate();
  const [createPet] = useMutation<CreatePetData, CreatePetVars>(CREATE_PET);
  const [name, setName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [age, setAge] = useState<number>(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  const { data, loading, error } = useQuery<ListUsersData>(LIST_USERS);

  const handleCreatePet = async () => {
    try {
      await createPet({
        variables: {
          input: { name, age, userId },
        },
        refetchQueries: [{ query: LIST_USERS }], // refetch data list user for homepage
      });
      navigate("/");
    } catch (error) {
      setMessage("Created pet failed. Please check your input.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
        <Typography variant="h3">Create Pet</Typography>
        <FormControl variant="standard" sx={{ width: "350px" }}>
          <InputLabel htmlFor="input-name">Pet Name</InputLabel>
          <Input
            id="input-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ width: "350px" }}>
          <InputLabel htmlFor="input-age">Age</InputLabel>
          <Input
            id="input-age"
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value, 10))}
          />
        </FormControl>

        <FormControl fullWidth sx={{ width: "350px" }}>
          <InputLabel id="select-user-label">User</InputLabel>
          <Select
            labelId="select-user-label"
            id="select-user"
            value={userId}
            label="User"
            onChange={(e: SelectChangeEvent<string>) =>
              setUserId(e.target.value)
            }
          >
            {data?.listUser.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleCreatePet}>
          Create
        </Button>
      </Box>
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

export default CreatePetPage;
