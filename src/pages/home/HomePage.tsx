import React from "react";
import "./home.css";

export const HomePage = () => {
  const onClick = () => {};

  return (
    <div className="homepage-content">
      <img className="homepage-teknoyemek" alt="Logo" />
      <img
        className="homepage-content-img"
        src="home-logo.png"
        alt="Home Banner"
      />
      <div className="homepage-content-overlay">
        <h1 className="homepage-content-text">
          KOD ACIKTIRIR
          <br />
          PİZZA, DOYURUR
        </h1>
        <button className="homepage-content-btn" onClick={onClick}>
          ACIKTIM
        </button>
      </div>
    </div>
  );
};
