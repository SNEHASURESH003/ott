import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function SelectedMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    if (!token) return setError("Not authenticated.");

    axios
      .get(`http://127.0.0.1:8000/api/movieview/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setMovie(res.data);
      })
      .catch(() => {
        setError("Unable to load movie.");
      });
  }, [id]);

  if (error) {
    return (
      <div style={{ padding: 20, color: "red", textAlign: "center" }}>
        <p>{error}</p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          Back
        </button>
      </div>
    );
  }

  if (!movie) return <p style={{ color: "white", padding: 20, textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ color: "white", minHeight: "100vh"}}>
      <Navbar />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh", padding: 20 }}
      >
        <div
          className="shadow-lg"
          style={{
          
            padding: "30px",
            borderRadius: "15px",
            maxWidth: "800px",
            width: "100%",
          }}
        >
          <button onClick={() => navigate(-1)} className="btn btn-outline-light mb-3">
            &larr; Back
          </button>

          <h2 className="mb-4 text-center">{movie.title}</h2>

          {movie.thumbnail && (
            <div className="text-center mb-4">
             <img
  src={`http://127.0.0.1:8000/${movie.thumbnail}`}
  alt={movie.thumbnail}
  style={{
    width: "100%",
    height: "450px",
    objectFit: "cover",
    borderRadius: "10px",
  }}
/>
            </div>
          )}

          {movie.video ? (
            <div className="text-center mb-4">
              <h5>Watch Movie:</h5>
              <video
  width="100%"
  height="450"
  style={{ borderRadius: "10px", backgroundColor: "black" }}
  controls
>
  <source src={`http://127.0.0.1:8000/${movie.video}`} type="video/mp4" />
  Your browser doesn't support video.
</video>

            </div>
          ) : (
            <p className="text-muted text-center">No video available.</p>
          )}

          <div
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              backgroundColor: "#2a2a2a",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <p style={{ margin: 0 }}>{movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedMovie;
