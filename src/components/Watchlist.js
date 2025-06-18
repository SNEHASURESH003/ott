import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/style.css";
import sign from "../images/bg.jpg";
import Navbar from "./Navbar";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [movieToRemove, setMovieToRemove] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/watchlist/", {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setWatchlist(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load watchlist");
        setLoading(false);
      });
  }, [navigate]);

  const confirmRemove = (movie) => {
    setMovieToRemove(movie);
    setShowModal(true);
  };

  const removeFromWatchlist = () => {
    const token = localStorage.getItem("authtoken");
    axios
      .delete("http://127.0.0.1:8000/api/watchlist/", {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        data: { movie_id: movieToRemove.movie_id },
      })
      .then(() => {
        setWatchlist((prev) =>
          prev.filter((m) => m.movie_id !== movieToRemove.movie_id)
        );
        setShowModal(false);
        setMovieToRemove(null);
      })
      .catch((err) => {
        console.error("Remove error:", err.response?.data || err.message);
        alert("Failed to remove movie from watchlist.");
        setShowModal(false);
      });
  };

  return (
    <div style={{ position: "relative", color: "white" }}>
      <img
        src={sign}
        alt="Background"
        className="fullscreen-image"
        style={{
          position: "fixed",
          zIndex: -1,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Navbar />
      <div
        style={{
          paddingTop: "50px",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "20px",
          marginLeft: "240px",
        }}
      >
    <h2 style={{ textAlign: "center" }}><b>YOUR WATCHLIST</b></h2><br></br>


        {loading && <p>Loading watchlist...</p>}<br></br>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && watchlist.length === 0 && (
          <p>You have no movies in your watchlist.</p>
        )}

        {!loading && !error && watchlist.length > 0 && (
          <div className="d-flex flex-wrap">
            {watchlist.map((movie) => (
              <div
                key={movie.id}
                className="card m-2 shadow"
                style={{ width: "18rem", cursor: "pointer" }}
                onClick={() => navigate(`/movies/${movie.movie_id}`)}
              >
                <img
                  src={`http://127.0.0.1:8000/${movie.thumbnail}`}
                  className="card-img-top thumbnail-img"
                  alt={movie.title}
                />
                <div className="card-body" style={{ backgroundColor: "rgb(87, 19, 104)" }}>
                  <h5 className="card-title" style={{ color: "white" }}>{movie.title}</h5>
                </div>
                <button
                  className="btn btn-danger"
                  style={{
                    width: "100%",
                    borderRadius: "0 0 0.25rem 0.25rem",
                    border: "none",
                    backgroundColor: "rgb(45, 10, 85)",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmRemove(movie);
                  }}
                >
                  <i className="bi bi-trash3-fill me-2"></i>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1050,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "rgba(78, 32, 116, 0.9)",
              padding: "20px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            <h5>Are you sure you want to remove this movie?</h5>
            <p style={{ fontWeight: "bold" }}>{movieToRemove?.title}</p>
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={removeFromWatchlist}
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Watchlist;
