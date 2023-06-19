import React from "react";
import "./tutorial.css";

import TutorialCard from "../components/funcComponents/TutorialCard";

import scissors from "../assets/images/FORBICI.png";
import rock from "../assets/images/SASSO.png";
import paper from "../assets/images/CARTA.png";

import rules from "../assets/images/246550.png";

function Tutorial() {
  return (
    <div className="container">
      <div className="wrapper">
        <h2>POSSIBLE MOVES</h2>
        <div className="tutorial-card-wrapper">
          <div>
            <h2>SCISSORS</h2>
            <TutorialCard tutorialImg={scissors} />
          </div>
          <div>
            <h2>ROCK</h2>
            <TutorialCard tutorialImg={rock} />
          </div>
          <div>
            <h2>PAPER</h2>
            <TutorialCard tutorialImg={paper} />
          </div>
        </div>
        <div className="rules-wrapper">
          <TutorialCard tutorialImg={rules} />
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
