import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import sign from '../images/bg.jpg'; 
import Navbar from "./Navbar";

function WatchHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/watchhistory/", {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const historyData = res.data;
        const latestHistoryObj = {};

        historyData.forEach((entry) => {
          const current = latestHistoryObj[entry.movie_id];
          if (!current || new Date(entry.watched_at) > new Date(current.watched_at)) {
            latestHistoryObj[entry.movie_id] = entry;
          }
        });

        setHistory(Object.values(latestHistoryObj));
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load watch history");
        setLoading(false);
      });
  }, [navigate]);

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
          objectFit: "cover"
        }}
      />
      <Navbar />
      <div
        style={{
          paddingTop: "50px",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "20px",
          marginLeft: "240px"
        }}
      >
        <h2 style={{ textAlign: "center" }}><b>YOUR WATCHHISTORY</b></h2><br></br>
        {loading && <p>Loading watch history...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && history.length === 0 && (
          <p>You haven't watched any movies yet.</p>
        )}
        {!loading && !error && history.length > 0 && (
          <div className="d-flex flex-wrap">
            {history.map((movie) => (
              <div key={movie.movie_id} className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`http://127.0.0.1:8000/${movie.thumbnail}`}
                  className="card-img-top thumbnail-img"
                  alt={movie.title}
                />
                <div className="card-body" style={{ backgroundColor: "rgb(87, 19, 104)" }}>
                  <h5 className="card-title" style={{ color: "white" }}>{movie.title}</h5>
                  <p className="card-text" style={{ color: "white" }}>
                    Watched on: {new Date(movie.watched_at).toLocaleString()}
                  </p>
                  <button
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      borderRadius: "0 0 8px 8px",
                      backgroundColor:  "rgb(68, 5, 56)",
                    }}
                    onClick={async (e) => {
                      e.stopPropagation();
                      try {
                        const token = localStorage.getItem("authtoken");
                        await axios.post(
                          "http://127.0.0.1:8000/api/watchhistory/",
                          { movie_id: movie.movie_id },
                          {
                            headers: {
                              Authorization: `Token ${token}`,
                              "Content-Type": "application/json",
                            },
                          }
                        );
                        navigate(`/movies/${movie.movie_id}`);
                      } catch (error) {
                        console.error("Failed to update watch time:", error);
                      }
                    }}
                  >
                    <i className="bi bi-play-fill me-2"></i>
                    Resume
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchHistory;
