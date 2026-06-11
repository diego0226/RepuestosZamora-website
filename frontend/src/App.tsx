import { useState } from "react";
import { ServicioList } from "./components/Servicio/ServicioList";
import { RepuestoList } from "./components/Repuesto/RepuestoList";


function App() {
  const [vista, setVista] = useState<"servicios" | "repuestos">("servicios");

  return (
    <div>
      <button onClick={() => setVista("servicios")}>Servicios</button>
      <button onClick={() => setVista("repuestos")}>Repuestos</button>

      {vista === "servicios" && <ServicioList />}
      {vista === "repuestos" && <RepuestoList />}
    </div>
  );
}

export default App;