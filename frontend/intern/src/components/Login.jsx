import React from "react";
import { useState } from "react";
// import {useHis}
import axios from "axios";
import "../css/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email, password);
  const Login = async () => {
    try {
      const res = await axios.post("http://localhost:3001/login", {
        Name: email,
        Password: password,
      });
      if (res.data == "Invalid username/passowrd") {
        console.log("Ji");
          window.alert("Invalid")

      } else {
        console.log("ji2");
        if (res.data.Token) {
          localStorage.setItem("Token", res.data.Token);
          window.location.href="/customer"
        }
        console.log(res.data);
      }
    } catch (error) {
      console.log(error.status);
    }
  };
  return (
    <section>
      <div className="container-fluid d-flex justify-content-center align-items-center login-container">
        <div class="card login-card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (e.target.checkValidity()) {
                  console.log("...");
                  Login();
                }
              }}
            >
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" class="btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
