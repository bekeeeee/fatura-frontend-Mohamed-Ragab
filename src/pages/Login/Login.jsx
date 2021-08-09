import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import useRequest from "../../hooks/use-request";
import "./Login.css";
const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const { doRequest: loginRequest, errors } = useRequest({
    url: "/user/signin",
    method: "post",

    onSuccess: (data) => {
      setEmail("");
      setPassword("");
      history.push("/");
      login(data);
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await loginRequest({
      email,
      password,
    });
  };
  return (
    <div className="container">
      <div className="form-login">
        <h1>Hello User!</h1>

        <div className="email-input">
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="password-input">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <div className="error-msg">
            {errors ? errors : null}
          </div>

          <button type="submit" onClick={onSubmit} className="btn login-submit">
            Log In
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;
