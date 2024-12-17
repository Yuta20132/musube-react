import React from "react";
import axios from "axios";
import { Button, Box, Container, Typography } from "@mui/material";

const Logout = () => {
  const handleLogout = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/logout/",
        {}, // 送信データが不要なので空オブジェクト
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        textAlign="center"
      >
        <Typography variant="h4" gutterBottom>
          Logout Page
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
          sx={{ marginTop: 2, width: '100%' }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Logout;