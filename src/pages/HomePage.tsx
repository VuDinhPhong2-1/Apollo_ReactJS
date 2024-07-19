import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import UserTable from "../components/UserTable";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { GET_USER_FROM_TOKEN, LOGOUT_MUTATION } from "../queries/authQueries";
import { useMutation, useQuery } from "@apollo/client";

const HomePage: React.FC = () => {
  const accessToken = Cookies.get("access_token");
  console.log("accessToken", accessToken);
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

  const [
    logout,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(LOGOUT_MUTATION);

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
    if (queryLoading) return; // Nếu đang tải, không làm gì cả
    if (queryError) {
      console.error("Query Error:", queryError);
      return;
    }
    if (
      !queryData ||
      !queryData.getUserFromToken ||
      !queryData.getUserFromToken.id
    ) {
      console.error("User ID is not available.");
      return;
    }

    try {
      const userId = queryData.getUserFromToken.id; // Sửa đây
      console.log("userId", userId);
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

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "75px",
          bgcolor: "#00b894",
          gap: 2,
        }}
      >
        {isLoggedIn ? (
          <>
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
              onClick={handleLogoutClick}
            >
              Logout
            </Button>
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
