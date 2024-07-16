import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      let auth = localStorage.getItem("user");
      if (auth) {
        navigate("/");
      }
    });

    const handleLogin = async () => {
        console.log(email, password);
        let result = await fetch("http://localhost:5000/login", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        result = await result.json();
        console.log(result);
        if (result.token) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.token));
        navigate("/")
        }
    }
    return (
      <div className="register-1">
        <div className="register-2">
          <h1>Login</h1>
          <input
                    className="inputField"
                    placeholder="Enter Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
                    className="inputField"
                    placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="submitBtn " onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    );
}

export default Login;