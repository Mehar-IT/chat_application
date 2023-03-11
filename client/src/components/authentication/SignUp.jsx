import React from "react";
import { useState, useContext, useEffect } from "react";
import { useToast } from "@chakra-ui/toast";
import "./signUpForm.css";
import { UserContext } from "../../context/UserContextProvider";
import { registerUser, reset } from "../../context/userAction";
import { Spinner } from "@chakra-ui/spinner";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });
  const { name, email, password, confirmPassword } = formData;
  const [avatarPreview, setavatarPreview] = useState("/avatar.png");
  const { user: users, dispatch } = useContext(UserContext);
  const { error, loading, isAuthenticated, user } = users;

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setavatarPreview(reader.result);
          setFormData({ ...formData, [e.target.name]: reader.result });
        }
      };
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        description: "password must be matched",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    registerUser(dispatch, formData);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chats");
    }
    if (error) {
      toast({
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      reset(dispatch);
    }
  }, [error, isAuthenticated]);

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
            // required
          />
        </div>
        <button disabled={loading} type="submit">
          {loading ? <Spinner /> : "Register"}
        </button>
      </form>
    </div>
  );
}
