import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sign from "../images/bg.jpg";
import axios from "axios";

function LandingPage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    if (token) config.headers["Authorization"] = `Token ${token}`;

    axios
      .get("http://127.0.0.1:8000/api/movies/", config)
      .then((res) => setMovies(res.data))
      .catch(() => setMovies([]));
  }, [navigate]);

  const mainMovie = movies[0] || null;
  const otherMovies = movies.slice(1).slice(-4); // only last 4 after the first movie

  const styles = {
    landingPage: {
      position: "relative",
      minHeight: "100vh",
      color: "white",
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      paddingTop: "64px",
    },
    bgImage: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: -2,
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))",
      zIndex: -1,
    },
    navbar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "64px",
      backgroundColor: "rgba(0,0,0,0.3)",
      backdropFilter: "blur(6px)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 16px",
      zIndex: 2,
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      letterSpacing: "1.2px",
    },
    loginBtn: {
      background: "transparent",
      border: "1px solid white",
      padding: "8px 18px",
      color: "white",
      borderRadius: "5px",
      cursor: "pointer",
    },
    contentWrapper: {
      display: "flex",
      padding: "20px 40px",
      gap: "40px",
      flexWrap: "wrap",
    },
    leftColumn: {
      flex: "1 1 50%",
      minWidth: "300px",
      height: "100vh",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 0 40px rgba(0,0,0,0.5)",
      cursor: "pointer",
    },
    mainImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "12px",
      opacity: 0.95,
    },
    titleOverlay: {
      position: "absolute",
      bottom: 100,
      left: 40,
      fontSize: "2rem",
      fontWeight: "bold",
      background: "rgba(0, 0, 0, 0.4)",
      padding: "12px 20px",
      borderRadius: "10px",
      backdropFilter: "blur(4px)",
    },
    rightColumn: {
      flex: "1 1 35%",
      minWidth: "260px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    movieCard: {
      position: "relative",
      borderRadius: "10px",
      overflow: "hidden",
      cursor: "pointer",
      height: "160px",
      backgroundColor: "hsla(305, 88.90%, 45.90%, 0.96)",
      backdropFilter: "blur(2px)",
      boxShadow: "0 0 20px rgba(158, 34, 146, 0.9)",
    },
    cardImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: 0.95,
    },
    cardTitle: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      padding: "10px",
      background: "rgba(0, 0, 0, 0.5)",
      textAlign: "center",
      fontSize: "1rem",
      color: "white",
    },
  };

  return (
    <div style={styles.landingPage}>
      <img src={sign} alt="Background" style={styles.bgImage} />
      <div style={styles.overlay} />

      <nav style={styles.navbar}>
        <div style={styles.title}>CINEMATICA OBSCURA</div>
        <button style={styles.loginBtn} onClick={() => navigate("/login")}>
          Login
        </button>
      </nav>

      <div style={styles.contentWrapper}>
        {mainMovie && (
          <div
            style={styles.leftColumn}
            onClick={() => navigate("/login")}
          >
            <img
              src={`http://127.0.0.1:8000/${mainMovie.thumbnail}`}
              alt={mainMovie.title}
              style={styles.mainImg}
            />
            <div style={styles.titleOverlay}>{mainMovie.title}</div>
          </div>
        )}

        <div style={styles.rightColumn}>
          {otherMovies.map((movie) => (
            <div
              style={styles.movieCard}
              key={movie.id}
              onClick={() => navigate("/login")}
            >
              <img
                src={`http://127.0.0.1:8000/${movie.thumbnail}`}
                alt={movie.title}
                style={styles.cardImg}
              />
              <div style={styles.cardTitle}>{movie.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
