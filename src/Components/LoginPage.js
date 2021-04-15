import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CustomAlert from "./CustomAlert";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [showPassword, handleClickShowPassword] = useState(false);
  const [loader, handleShowLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const validateUser = async (email , password) => {
    let response = await fetch("http://api.vuetestapi.cobold.xyz/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      let jsonData = await response.json();
      
      handleShowLoader(false);
      
      if(jsonData && jsonData.token){
          localStorage.setItem('token',jsonData.token);
          window.location.assign('/dashboard')
      }
      else{
        if(jsonData.email){
          CustomAlert({
            message: jsonData.email[0] ,
          });
        }
        if(jsonData.password){
          CustomAlert({
            message: jsonData.password[0] ,
          });
        }
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;

    if (!email) {
      CustomAlert({
        message: "Please enter the email .?",
      });
    } else if (!password) {
      CustomAlert({
        message: "Please enter the password .?",
      });
    } else {
      handleShowLoader(true);
      validateUser(email, password);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h3>Login</h3>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            required
            style={{
              marginBottom: "25px",
              width: "80%",
            }}
          />

          <FormControl
            variant="outlined"
            style={{
              marginBottom: "25px",
              width: "80%",
            }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={state.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <div>
            {loader ? (
              <button
                type="submit"
                className="btn btn-outline-info login-button"
              >
                <i
                  className="fa fa-spinner fa-spin"
                  style={{ fontSize: "20px", color: "white" }}
                ></i>{" "}
                Loading ...
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-outline-info login-button"
              >
                login
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
