import React from "react";
import { useState, useContext, useEffect } from "react";
import "./signUpForm.css";
import { loginUser, reset } from "../../context/userAction";
import { UserContext } from "../../context/UserContextProvider";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const { user: users, dispatch } = useContext(UserContext);
  const { error, loading, isAuthenticated, user } = users;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(dispatch, formData);
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
        <button disabled={loading} className="loginBTN" type="submit">
          {loading ? <Spinner /> : "Login"}
        </button>
      </form>
    </div>
  );
}
