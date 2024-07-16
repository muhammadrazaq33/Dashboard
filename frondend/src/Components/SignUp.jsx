import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
        let auth = localStorage.getItem("user");
    if (auth) {
         navigate("/")
       }
  })

  const submitData = async () => {
    console.log(name, email, password);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result.data))
    localStorage.setItem("token", JSON.stringify(result.token))
    if (result) {
      navigate("/");
    }
  };
  return (
    <div className="register-1">
      <div className="register-2">
        <h1>Register</h1>
        <input
          className="inputField"
          placeholder="Enter name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="inputField"
          placeholder="Enter email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="inputField"
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submitBtn " onClick={submitData}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default SignUp;
