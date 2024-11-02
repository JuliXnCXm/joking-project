// src/App.js
import "./App.css";
import React, { useEffect, useState } from "react";
import { BACK_DEV_ALL_JOKES, BACK_DEV_INSERT_RATES } from "./api";

const App = () => {
  const [jokes, setJokes] = useState([]);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchJokes = async () => {
      console.log("Starting");
      try {
        const response = await fetch(BACK_DEV_ALL_JOKES);
        if (response.status === 200) {
          const data = await response.json();
          setJokes(data);
          setRatings(
            data.map(() => ({ humorEvidence: null, humorRating: null }))
          );
        } else {
          console.error("Error fetching jokes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching jokes:", error);
      }
    };

    fetchJokes();
  }, []);

  const handleEvidenceChange = (index, value) => {
    const newRatings = [...ratings];
    newRatings[index].humorEvidence = value;
    if (value !== "1") {
      newRatings[index].humorRating = null; // Reset rating if no humor evidence
    }
    setRatings(newRatings);
  };

  const handleRatingChange = (index, value) => {
    const newRatings = [...ratings];
    newRatings[index].humorRating = value;
    setRatings(newRatings);
  };

  const handleSubmit = async  (event) => {
    event.preventDefault();

    const structuredData = {
      jokes: jokes.map((joke, index) => ({
        _id: joke._id,
        jokeText: joke.jokeText,
        jokeHasHumor: ratings[index].humorEvidence === "1",
        jokeRate: ratings[index].humorRating
          ? Number(ratings[index].humorRating)
          : 1,
      })),
    };
    console.log("Datos enviados:", structuredData);
    const res = await fetch(BACK_DEV_INSERT_RATES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(structuredData),
    })
    if (!res.ok) {
      console.error("Error al insertar las calificaciones:", await res.json());
      return;
    } else {
        window.location.reload()
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
        height: "100vh",
      }}
    >
      <h1>Calificación de Chistes</h1>
      <form onSubmit={handleSubmit}>
        {jokes.map((joke, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <p>
              <strong>Chiste {index + 1}:</strong> {joke.jokeText}
            </p>
            <div>
              <label>
                <input
                  type="radio"
                  name={`humorEvidence-${index}`}
                  value="1"
                  checked={ratings[index]?.humorEvidence === "1"}
                  onChange={() => handleEvidenceChange(index, "1")}
                />
                Hay evidencia clara de humor
              </label>
              <label style={{ marginLeft: "10px" }}>
                <input
                  type="radio"
                  name={`humorEvidence-${index}`}
                  value="2"
                  checked={ratings[index]?.humorEvidence === "2"}
                  onChange={() => handleEvidenceChange(index, "2")}
                />
                No hay evidencia clara de humor
              </label>
            </div>
            {ratings[index]?.humorEvidence === "1" && (
              <div style={{ marginTop: "10px" }}>
                <p>Califica el nivel de humor (1 - 5):</p>
                {[1, 2, 3, 4, 5].map((score) => (
                  <label key={score} style={{ marginRight: "10px" }}>
                    <input
                      type="radio"
                      name={`humorRating-${index}`}
                      value={score}
                      checked={ratings[index]?.humorRating === String(score)}
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
