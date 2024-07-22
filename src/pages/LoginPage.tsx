import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../queries/authQueries";
import Cookies from "js-cookie";
import { Box, Button, TextField, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login] = useMutation(LOGIN_MUTATION);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login({
        variables: { loginUserInput: { email, password } },
      });
      if (response.data) {
        Cookies.set("access_token", response.data.login.access_token, {
          expires: 1,
        });

        Cookies.set("refresh_token", response.data.login.refresh_token, {
          expires: 7,
        });
        navigate("/");
      }
    } catch (err) {
      setMessage("Login failed. Please check your credentials.");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <TextField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        variant="outlined"
        margin="normal"
        sx={{ maxWidth: "260px" }}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        variant="outlined"
        sx={{ maxWidth: "260px" }}
        margin="normal"
      />
      <Button
        variant="contained"
        sx={{ height: "50px", maxWidth: "150px", marginTop: 2 }}
        onClick={handleLogin}
      >
        Login
      </Button>

      {/* Snackbar for error notification */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={
          <Button color="inherit" onClick={handleClose}>
            Close
          </Button>
        }
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
