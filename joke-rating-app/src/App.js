// src/App.js
import "./App.css"
import React, { useState } from "react";

const App = () => {
  // Lista de chistes
  const jokes = [
    "¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.",
    "¿Cuál es el colmo de Aladino? Tener mal genio.",
    "¿Por qué los pájaros vuelan hacia el sur? Porque caminando tardarían mucho.",
    "¿Cuál es el animal más antiguo? La cebra, porque está en blanco y negro.",
    "¿Por qué los esqueletos no pelean? Porque no tienen agallas.",
    "¿Qué le dijo una impresora a otra? 'Esa copia es tuya'.",
    "¿Por qué las focas miran siempre hacia arriba? Porque ahí están los focos.",
    "¿Qué hace una abeja en el gimnasio? Zumba.",
    "¿Por qué el libro de matemáticas estaba deprimido? Porque tenía muchos problemas.",
    "¿Cuál es el colmo de un electricista? No encontrar corriente en su vida.",
  ];

  const [ratings, setRatings] = useState(
    jokes.map(() => ({ humorEvidence: null, humorRating: null }))
  );

  // Manejar cambio en la evidencia de humor
  const handleEvidenceChange = (index, value) => {
    const newRatings = [...ratings];
    newRatings[index].humorEvidence = value;
    if (value !== "1") {
      newRatings[index].humorRating = null; // Limpiar rating si no hay humor
    }
    setRatings(newRatings);
  };

  // Manejar cambio en la calificación de humor (solo si hay evidencia de humor)
  const handleRatingChange = (index, value) => {
    const newRatings = [...ratings];
    newRatings[index].humorRating = value;
    setRatings(newRatings);
  };

  // Manejar envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Datos enviados:", ratings);
    alert("Datos guardados y enviados con éxito");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Calificación de Chistes</h1>
      <form onSubmit={handleSubmit}>
        {jokes.map((joke, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <p>
              <strong>Chiste {index + 1}:</strong> {joke}
            </p>
            <div>
              <label>
                <input
                  type="radio"
                  name={`humorEvidence-${index}`}
                  value="1"
                  checked={ratings[index].humorEvidence === "1"}
                  onChange={() => handleEvidenceChange(index, "1")}
                />
                Hay evidencia clara de humor
              </label>
              <label style={{ marginLeft: "10px" }}>
                <input
                  type="radio"
                  name={`humorEvidence-${index}`}
                  value="2"
                  checked={ratings[index].humorEvidence === "2"}
                  onChange={() => handleEvidenceChange(index, "2")}
                />
                No hay evidencia clara de humor
              </label>
            </div>
            {ratings[index].humorEvidence === "1" && (
              <div style={{ marginTop: "10px" }}>
                <p>Califica el nivel de humor (1 - 5):</p>
                {[1, 2, 3, 4, 5].map((score) => (
                  <label key={score} style={{ marginRight: "10px" }}>
                    <input
                      type="radio"
                      name={`humorRating-${index}`}
                      value={score}
                      checked={ratings[index].humorRating === String(score)}
                      onChange={() => handleRatingChange(index, String(score))}
                    />
                    {score}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
        <button
          type="submit"
          style={{ marginTop: "20px", padding: "10px 20px" }}
        >
          Guardar y Continuar
        </button>
      </form>
    </div>
  );
};

export default App;
