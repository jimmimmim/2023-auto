import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import NavBar from "./components/NavBar";

// import Map from "./pages/Map";
import Map from "./pages/Map2";
// import Calc from "./pages/Calc";
import NoPage from "./pages/NoPage";

import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TransitionGroup>
          <CSSTransition timeout={300} classNames="fade">
            <Routes>
              <Route path="/" element={<NavBar />}>
                <Route index element={<Map />} />
                <Route path="map" element={<Map />} />
                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </BrowserRouter>
    </div>
  );
}

export default App;
