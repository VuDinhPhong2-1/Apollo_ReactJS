import React, { useEffect, useState } from "react";
import { Avatar, Box, Button } from "@mui/material";
import UserTable from "../components/UserTable";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { GET_USER_FROM_TOKEN, LOGOUT_MUTATION } from "../queries/authQueries";
import { useMutation, useQuery } from "@apollo/client";


const HomePage: React.FC = () => {
  const accessToken = Cookies.get("access_token");
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(GET_USER_FROM_TOKEN, {
    variables: { access_token: accessToken },
    skip: !accessToken, // Bỏ qua query khi không có token
  });
  const [logout] = useMutation(LOGOUT_MUTATION);

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [accessToken]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = async () => {
    if (queryLoading) return;
    if (queryError) {
      return;
    }
    if (
      !queryData ||
      !queryData.getUserFromToken ||
      !queryData.getUserFromToken.id
    ) {
      return;
    }

    try {
      const userId = queryData.getUserFromToken.id;
      await logout({ variables: { userId } });
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error: {queryError.message}</p>;

  const UserAvatar = () => {
    if (!queryData) return;
    const name = queryData.getUserFromToken.name;
    const firstLetter = name.charAt(0).toUpperCase();

    return <Avatar>{firstLetter}</Avatar>;
  };
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "75px",
          bgcolor: "#00b894",
          gap: 2,
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        {isLoggedIn ? (
          <>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                sx={{ height: "50px", maxWidth: "150px" }}
                onClick={() => navigate("/create-user")}
              >
                Create User
              </Button>
              <Button
                variant="contained"
                sx={{ height: "50px", maxWidth: "150px" }}
                onClick={() => navigate("/create-pet")}
              >
                Create Pet
              </Button>
              <Button
                variant="contained"
                sx={{ height: "50px", maxWidth: "150px" }}
                onClick={handleLogoutClick}
              >
                Logout
              </Button>
            </Box>
            <UserAvatar />
          </>
        ) : (
          <Button
            variant="contained"
            sx={{ height: "50px", maxWidth: "150px" }}
            onClick={handleLoginClick}
          >
            Login
          </Button>
        )}
      </Box>
      {isLoggedIn && (
        <Box sx={{ p: 2 }}>
          <UserTable />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
