import React from "react";
import config from "../config.js";

import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const onSignup = async () => {
    const email = document.getElementById("email-input").value;
    const password1 = document.getElementById("password1-input").value;
    const password2 = document.getElementById("password2-input").value;

    if (password1.length < 4) {
      alert("El tamaño de la contraseña es incorrecto!");
      return;
    }
    if (password1 != password2) {
      alert("Las contraseñas no coinciden!");
      return;
    }
    const body = JSON.stringify({
      email,
      password1: password1,
      password2: password2,
    });
    const res = await fetch(`${config.HOSTNAME}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const data = await res.json();
    if (res.status != 201) {
      alert(data.msg);
      return;
    }
    ///---------------------///
    navigate("/login");
  };

  return (
    <div className="container w-25 mt-5">
      <h1>Signup</h1>
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
          id="password1-input"
          placeholder="Ingrese contraseña"
        />
        <div id="emailHelp" className="form-text">
          La contraseña debe ser mayor a 4 caracteres.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password2-input" className="form-label text-light">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password2-input"
          placeholder="Repita su contraseña"
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={onSignup}>
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
