import { useState } from "react";
import "../css/log.css";
import Swal from "sweetalert2";

function Log() {
  const [Usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const Validation = (e) => {
    e.preventDefault();
    if (Usuario && contraseña) {
      if (Usuario == "juan" && contraseña == "1234") {
        Swal.fire({
          icon: "success",
          text: "ingreso exitoso",
          timer: 2000,
        }).then(() => {
          setUsuario("");
          setContraseña("");
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "el usuario o la contraseña son incorrectos",
          timer: 2000,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "llene los campos",
        timer: 2000,
      });
    }
  };

  return (
    <div className="Log-content-1">
      <div className="Log-content-2">
        <h1>Login</h1>
        <form onSubmit={Validation}>
          <div>
            <input
              value={Usuario}
              onChange={(e) => {
                setUsuario(e.target.value);
              }}
              placeholder="Usuario"
            />
            <input
              value={contraseña}
              onChange={(e) => {
                setContraseña(e.target.value);
              }}
              placeholder="Contraseña"
            />
          </div>
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Log;
