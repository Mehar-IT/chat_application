import React from "react";
import { useState } from "react";
import "./signUpForm.css";

export default function SignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });
  const { name, email, password, confirmPassword } = user;
  const [avatarPreview, setavatarPreview] = useState("/avatar.png");

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setavatarPreview(reader.result);
          setUser({ ...user, [e.target.name]: reader.result });
        }
      };
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <div spacing={"5px"}>
      <form className="signUpForm" onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name <span>*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          onChange={handleChange}
          value={name}
          required
        />
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
        <label htmlFor="confirmPassword">
          Confirm Password<span>*</span>
        </label>
        <input
          id="confirmPassowrd"
          type="password"
          name="confirmPassword"
          placeholder="Enter your confirm password"
          onChange={handleChange}
          value={confirmPassword}
          required
        />
        <div>
          <img src={avatarPreview} alt="avatar img" />
          <input
            id="avatar"
            type="file"
            accept="image/jpg,image/jpeg,image/png"
            name="avatar"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
