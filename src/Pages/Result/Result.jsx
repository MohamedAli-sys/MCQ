import { Box, Container, StepConnector, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const globalState = useSelector((state) => state);
  const [result, setResult] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    let loggedIn = globalState.auth.login;
    if (!loggedIn) nav("/Login");
    setResult((globalState.result.result * 100) / 7);
  }, []);
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "left" }}>
          Student Name:{" "}
          <span style={{ fontWeight: "bold" }}>{globalState.auth.name}</span>
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0px 0 6px 2px #88888875",
          padding: "30px",
          marginTop: "20px",
        }}
      >
        <Typography variant="h6" sx={{ pb: 2, fontWeight: "bold" }}>
          Your Results
        </Typography>
        <StepConnector />
        <Box
          p={10}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" fontWeight={"bold"}>
            {result}%
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Result;
