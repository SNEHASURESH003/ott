import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import SelectedMovie from "./Movieview";
import Navbar from "./Navbar";
import image from "../images/bg.jpg";

function SelectedMovieWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    if (!id) return;

    // Fetch movie details by ID
    fetch(`http://127.0.0.1:8000/api/movies/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch movie");
        return res.json();
      })
      .then((data) => setMovie(data))
      .catch(() => setError("Failed to load movie details"));
  }, [id]);

  if (error)
    return (
      <div style={{ color: "red", padding: "20px" }}>
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );

  if (!movie)
    return (
      <div style={{ color: "white", padding: "20px" }}>
        <p>Loading movie...</p>
      </div>
    );

  return (
    <div>
      {/* Background Image */}
      <img src={image} alt="Background" className="fullscreen-image" />

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div
        className="container mt-5"
        style={{ marginLeft: "240px", padding: "0 20px" }}
      >
        <SelectedMovie movie={movie} onBack={() => navigate(-1)} />
      </div>
    </div>
  );
}

export default SelectedMovieWrapper;
