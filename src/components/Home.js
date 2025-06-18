import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/style.css";
import SelectedMovie from "./Movieview";
import { useNavigate } from "react-router-dom";


function MovieCard({ movie, showModal }) {
  const navigate = useNavigate();

  const handleCardClick = async () => {
    const token = localStorage.getItem("authtoken");
   

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/watchhistory/",
        { movie_id: movie.id },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      navigate(`/movies/${movie.id}`); // ✅ go to Movieview
    } catch (err) {
      console.error("Failed to add to watch history", err);
    }
  };

  const handleButtonClick = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("authtoken");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/watchlist/",
        { movie_id: movie.id },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      showModal(response.data.message || `${movie.title} added to watchlist!`);
    } catch (err) {
      if (err.response?.data?.message === "Already in watchlist") {
        showModal(`${movie.title} is already in your watchlist.`);
      } else {
        showModal("Failed to add to watchlist.");
        console.error(err);
      }
    }
  };

  return (
    <div
      className="card m-2 shadow"
      style={{ width: "18rem", cursor: "pointer" }}
      onClick={handleCardClick}
    >
      <img
        src={`http://127.0.0.1:8000/${movie.thumbnail}`}
        className="card-img-top thumbnail-img"
        alt={movie.thumbnail}
      />
      <div className="card-body custom-body">
        <h5 className="card-title">{movie.title}</h5>
      </div>
      <button
        className="btn"
        style={{
          backgroundColor:  "rgb(45, 10, 85)",
          color: "white",
          width: "100%",
          borderRadius: "0 0 0.25rem 0.25rem",
          border: "none",
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleButtonClick(e);
        }}
      >
        <i className="bi bi-bookmark-plus me-2"></i>
        Add to Watchlist
      </button>
    </div>
  );
}

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    

  // Modal state
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
 

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
     if (!token) {
      navigate("/login");
      return;
    }

     

    axios
      .get("http://127.0.0.1:8000/api/movies/", {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load movies");
        setLoading(false);
      });
  },[navigate]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
        color: "white",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {!selectedMovie ? (
        <>
          {/* Search Bar */}
          <div
            className="input-group input-group-sm"
            style={{ maxWidth: "300px" }}
          >
            <input
  type="text"
  className="form-control text-white"
  placeholder="Search movie..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  style={{
    height: "28px",
    backgroundColor: "transparent",
    border: "1px solid #ccc", // optional: tweak or remove
    color: "white",
  }}
/>

            <span
  className="input-group-text text-white"
  style={{
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: "1px solid #ccc", // optional, for visible border
  }}
>
  <i className="bi bi-search"></i>
</span>

           
          </div><br></br>
          <style>
  {`
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}
</style>

 <h4
  style={{
    fontStyle: "italic",
    fontSize: "1.5rem",
    color: "transparent",
    backgroundImage: "linear-gradient(90deg,rgb(255, 0, 221),rgb(229, 46, 186))",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    textAlign: "center",
    margin: "20px 0",
    animation: "fadeIn 2s ease-in-out",
  }}
>
  Dive into the story, explore the world, and experience the magic of this movie like never before...
</h4>

          <br />

          {/* Movie Cards Grid */}
          <div className="main-content">
            <div className="d-flex flex-wrap">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  showModal={handleShowModal}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <SelectedMovie movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
      )}

      {/* Modal */}
      {/* Modal */}
{showModal && (
  <div
    className="modal fade show"
    style={{
      display: "flex",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 1050,
      justifyContent: "center",
      alignItems: "center",
      pointerEvents: "auto", // ensure overlay can receive pointer events
    }}
  >
    <div
      className="modal-dialog"
      style={{
        backgroundColor: "rgba(78, 32, 116, 0.9)",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "auto",
        textAlign: "center",
        pointerEvents: "auto", // ensure dialog itself can receive pointer events
      }}
    >
      <p>{modalMessage}</p>
      <button
        className="btn btn-primary mt-3"
        style={{ pointerEvents: "auto" }}
        onClick={() => setShowModal(false)}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default Home;
