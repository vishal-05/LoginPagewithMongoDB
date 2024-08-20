import "./App.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import {
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  DialogActions,
  Dialog,
  DialogContent,
  Container,
  Box
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import ErrorIcon from "@mui/icons-material/Error";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";

function Register() {
  const history = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const togglePasswordVisibility = () => {
    if(showPassword){
      setShowPassword(false)
    }else {
      setShowPassword(true)
    }
  };

  const redirectToLoginPage = () => {
    history("/login");
  };

  const handleDialogClose = () => {
    setDialogOpen(false); // Close the dialog
  };
  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:1337/api/register", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json()
    if(data.status === 'ok'){
      setDialogMessage("Login successful.");
      setDialogOpen(true);
    }
    console.log(data)
  }

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
    <Box
      sx={{
        maxWidth: "400px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "25px",
        marginTop: "25px",
      }}
    >
  <form onSubmit={registerUser}>
    {errorMessage && (
      <Typography
        sx={{ display: "flex", justifyContent: "center", color: "red" }}
      >
        {errorMessage}
      </Typography>
    )}
    <Typography
      sx={{
        display: "flex",
        justifyContent: "center",
        fontSize: "24px",
        fontWeight: "600",
        fontFamily: "Inter,sans-serif",
      }}
      gutterBottom
    >
      Register
    </Typography>
    <TextField
      fullWidth
      name="emailId"
      size="small"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Full Name"
      sx={{
        marginTop: "15px",
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PersonIcon />
          </InputAdornment>
        ),
        className: "textField-input",
      }}
    />
    <TextField
      fullWidth
      name="emailId"
      size="small"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="EmailId or username"
      sx={{
        marginTop: "15px",
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PersonIcon />
          </InputAdornment>
        ),
        className: "textField-input",
      }}
    />
    {errorMessage && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "red",
          marginLeft: "12px",
        }}
      >
        <ErrorIcon sx={{ fontSize: "16px", color: "red" }} />
        <span style={{ marginLeft: "12px", fontSize: "14px" }}>
          {errorMessage}
        </span>
      </div>
    )}
    <TextField
      type={showPassword ? "text" : "password"}
      size="small"
      fullWidth
      name="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      sx={{
        marginTop: "15px",
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
        className: "textField-input",
      }}
    />

    <div
      style={{
        display: "flex",
        alignItems: "center",
        color: "red",
        marginLeft: "12px",
      }}
    >
      {errorMessage && (
        <>
          <ErrorIcon sx={{ fontSize: "16px", color: "red" }} />
          <span style={{ marginLeft: "12px", fontSize: "14px" }}>
            {errorMessage}
          </span>
        </>
      )}
    </div>

    <Button
      type="submit"
      variant="contained"
      sx={{ marginTop: "15px", width: "100%", textTransform: "capitalize" }}
    >
      log in
    </Button>
    <Typography
      sx={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
    >
      Already have an account?{" "}
      <span
        style={{
          cursor: "pointer",
          marginLeft: "5px",
          textTransform: "none",
          color: "blue",
          fontWeight: "600",
        }}
        onClick={redirectToLoginPage}
      >
        Login
      </span>
    </Typography>
    <Dialog open={dialogOpen} onClose={handleDialogClose}>
      <DialogContent>
        <p>{dialogMessage}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={redirectToLoginPage}>Login Now</Button>
      </DialogActions>
    </Dialog>
  </form>
  </Box>
  </Container>
  );
}

export default Register;
