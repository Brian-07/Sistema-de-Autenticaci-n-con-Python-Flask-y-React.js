import React from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";

export const Login = () => {
  const navigate = useNavigate();
  const onLogin = async () => {
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;

    const body = JSON.stringify({ email, password });
    const res = await fetch(`${config.HOSTNAME}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const data = await res.json();
    if (res.status == 200) {
      const token = data.data;
      localStorage.token = JSON.stringify({ token })
      localStorage.email = email;
      navigate("/private");
      return;
    } else if (res.status != 200) {
      alert(data.msg);
      return;
    }
  };

  return (
    <div className="container w-25 mt-5">
      <h1>Login</h1>
      <div className="mb-3">
        <label htmlFor="email-input" className="form-label text-light">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email-input"
          placeholder="name@example.com"
        />
        <div id="emailHelp" className="form-text">
          Nunca compartiremos su correo electrónico con nadie más.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password1-input" className="form-label text-light">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password-input"
          placeholder="Ingrese contraseña"
        />
        <div id="emailHelp" className="form-text"></div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={onLogin}>
        Submit
      </button>
      <a
        href="https://3000-4geeksacade-reactflaskh-z049cqz9ken.ws-eu77.gitpod.io"
        className="btn btn-secondary ms-3"
      >
        Home
      </a>
    </div>
  );
};
