import React from "react";
import { useState } from "react";
import "./signUpForm.css";

export default function SignUp() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <div spacing={"5px"}>
      <form className="signUpForm" onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email<span>*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          onChange={handleChange}
          value={email}
          required
        />
        <label htmlFor="password">
          Password<span>*</span>
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          value={password}
          required
        />
        <button type="submit" className="loginBTN">
          Login
        </button>
      </form>
    </div>
  );
}
