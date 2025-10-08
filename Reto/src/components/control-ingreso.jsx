import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../css/Ingreso.css";

function Ingreso() {
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [cedula, setCedula] = useState("");
  const [tabla, settabla] = useState([]);

  // 🔄 Función para llenar la tabla
  const Llenartabla = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vehiculos");
      settabla(res.data);
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
    }
  };

  useEffect(() => {
    Llenartabla();
  }, []);

  const registrarVehiculo = async (e) => {
    e.preventDefault();

    if (!placa || !modelo || !cedula) {
      Swal.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Por favor, completa todos los campos.",
      });
      return;
    }

    try {
      const respuesta = await axios.post(
        "http://localhost:5000/api/vehiculos",
        {
          placa,
          modelo,
          cedula_dueno: cedula,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Vehículo registrado",
        text: `Placa: ${placa}`,
      });

      setPlaca("");
      setModelo("");
      setCedula("");

      await Llenartabla();

      console.log("✅ Enviado:", respuesta.data);
    } catch (error) {
      console.error("❌ Error al registrar:", error);
      Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: "No se pudo registrar el vehículo.",
      });
    }
  };

  return (
    <div className="Log-content-1">
      <div className="Ingreso-content-1">
        <h1>Bienvenido Juan</h1>

        <div className="container-2">
          <form onSubmit={registrarVehiculo} className="form-ingreso">
            <input
              type="text"
              placeholder="Placa del vehículo"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
            />
            <input
              type="text"
              placeholder="Modelo del vehículo"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
            />
            <input
              type="number"
              placeholder="Cédula del dueño"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
            <button className="boton-none" type="submit"></button>
          </form>
          <div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Placa</th>
                  <th>Modelo</th>
                  <th>Cédula Dueño</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {tabla.length > 0 ? (
                  tabla.map((datos, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{datos.placa}</td>
                      <td>{datos.modelo}</td>
                      <td>{datos.cedula_dueno}</td>
                      <td>
                        {datos.bandera ? "🟢 En el parqueadero" : "🔴 Ya salió"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No hay vehículos registrados</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <button className="boton" onClick={registrarVehiculo}>
          Ingresar
        </button>
      </div>
    </div>
  );
}

export default Ingreso;
