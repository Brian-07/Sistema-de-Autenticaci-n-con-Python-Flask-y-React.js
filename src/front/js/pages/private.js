import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";

export const Private = (props) => {
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenObj = localStorage.token;
    if (!tokenObj) {
      navigate("/login");
    } else {
      try {
        const tokenData = JSON.parse(tokenObj);
       

        fetch(`${config.HOSTNAME}/api/private`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (!data.data) {
              navigate("/login");
              return;
            }

            setDisabled(false);
          });
      } catch (e) {
        navigate("/login");
        return;
      }
    }
  }, [disabled]);

  const eliminarUsuario = () =>{
    localStorage.removeItem("email")
    localStorage.removeItem("token")
    navigate("/")
  }

  if (disabled) {
    return (
      <div>
        <h1>Cargando</h1>
      </div>
    );
  }

  return (
    <div className="container w-25 mt-5">
      <h1>Private</h1>
      <div className="alert alert-light" role="alert">
          <strong>Bienvenido a tu sección {localStorage.email}</strong>
      </div>
      <button type="submit" className="btn btn-danger" onClick={eliminarUsuario}>
        Cerrar sesión
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
