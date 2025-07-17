import React, { useEffect, useState } from "react";
import "./Login.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const Navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    if (form.email === "" || form.password === "") {
      Swal.fire({
        title: "Error!",
        text: "inputs are required",
        icon: "error",
      });
    } else if (
      form.email === "admin@gmail.com" ||
      form.password === "Admin200"
    ) {
      Swal.fire({
        title: "Success!",
        text: "Login Successful",
        icon: "success",
      });
      setTimeout(() => {
        Navigate("/page");
        window.scrollTo(0, 0);
      }, 2000);
    } else {
      Swal.fire({
        title: "Error!",
        text: "Incorrect Password Or Email",
        icon: "error",
      });
    }
    e.preventDefault();
  };
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-head">
          Vill<span>yz</span>
        </div>
        <div className="login shadow">
          <div className="login-welcome">Welcome back !!</div>
          <div className="content">Sign in to admin panel</div>
          <form className="input-container">
            <div className="input">
              <label htmlFor="">Email</label>
              <br />
              <input
                type="text"
                name="email"
                onChange={handleInput}
                placeholder="example@gmail.com"
              />
            </div>
            <div className="input">
              <label htmlFor="">password</label>
              <br />
              <input
                type="password"
                name="password"
                placeholder="*************"
                onChange={handleInput}
              />
            </div>
            <div className="input ">
              <div className="d-flex align-items-center gap-2 mt-3">
                <div>
                  <input type="checkbox" />
                </div>
                <label htmlFor="">Remember me</label>
              </div>
            </div>
            <button className="login-btn" type="submit" onClick={handleSubmit}>
              login
            </button>
            <button className="login-btn2" onClick={() => Navigate("/page")}>
              Enter As Guest
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
