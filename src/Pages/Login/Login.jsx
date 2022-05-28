import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Store/LoginSlice";

const Login = () => {
  const globalState = useSelector((state) => state);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [validator, setValidator] = useState({
    email: "",
    name: "",
    password: "",
  });

  useEffect(() => {
    let loggedIn = globalState.auth.login;
    if (loggedIn) nav("/");
  }, []);

  const handleValidation = (e) => {
    switch (e.target.name) {
      case "name":
        setValidator({
          ...validator,
          name:
            e.target.value.length === 0
              ? "This Is Required"
              : e.target.value.length < 6
              ? "Minumum Length is 6 Chars"
              : null,
        });
        break;
      case "email":
        setValidator({
          ...validator,
          email:
            e.target.value === 0
              ? "This Is Required"
              : e.target.value.length < 6
              ? "Minumum Length is 6 Chars"
              : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value)
              ? "Not Valid Email"
              : null,
        });
        break;
      case "password":
        setValidator({
          ...validator,
          password:
            e.target.value === 0
              ? "This Is Required"
              : e.target.value.length < 8
              ? "Minumum Length is 8 Chars"
              : null,
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    });
    dispatch(auth({ login: !globalState.auth.login, name: data.get("name") }));
    nav("/");
  };
  return (
    <div className="loginPage">
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <CssBaseline />
        <Typography component="h1" variant="h5" align="center">
          Master Linux Front End Challange
        </Typography>
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoFocus
              onChange={handleValidation}
              error={validator.name !== null}
              helperText={validator.name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleValidation}
              error={validator.email !== null}
              helperText={validator.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleValidation}
              error={validator.password !== null}
              helperText={validator.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                validator.name !== null ||
                validator.email !== null ||
                validator.password !== null
              }
            >
              Log in
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
