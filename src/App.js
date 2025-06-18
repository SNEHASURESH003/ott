import React  from 'react';
import Navbar from './components/Navbar';
import image from './images/bg.jpg';
import "./components/style.css";
import Home from './components/Home';



function App() {
  return(
  <div>
     <img src={image} alt="Background" className="fullscreen-image" />
    <Navbar/>
    <div className="main-content" style={{ marginLeft: '240px', padding: '20px', width: '100%' }}>
          <Home />
    </div>
   
   
  </div>
);
}

export default App;