import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function startGame() {
    setTimeout(() => {
      navigate("game");
    }, 200);
  }

  function goToTutorial() {
    navigate("tutorial");
  }

  return (
    <div className="container ">
      <div className="head-title">
        <h1>ROCK-PAPER-SCISSORS</h1>
      </div>
      <div className="play flex-center">
        <div className="image-wrapper">
          <img
            src={require("../assets/images/Cartoon-Play-button-icon-on-transparent-background-PNG.png")}
            onClick={startGame}
          />
        </div>
        <div className="image-wrapper">
          <img
            src={require("../assets/images/TUTORIAL.png")}
            onClick={goToTutorial}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
