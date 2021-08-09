import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import useRequest from "../../hooks/use-request";

const Signup = ({ history }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const { doRequest: signupRequest, errors } = useRequest({
    url: "/user/signup",
    method: "post",

    onSuccess: (data) => {
      setEmail("");
      setUsername("");
      setPassword("");
      history.push("/");
      login(data);
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await signupRequest({
      email,
      username,
      password,
      role: "user",
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

        <div className="username-input">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              e.preventDefault();
              setUsername(e.target.value);
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
          <div className="error-msg">{errors ? errors : null}</div>

          <button type="submit" onClick={onSubmit} className="btn login-submit">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
