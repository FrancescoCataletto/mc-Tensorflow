import React, { Component } from "react";
import "./game.css";

// IMAGES
import scissors from "../assets/images/Screenshot 2023-06-12 214555.png";
import rock from "../assets/images/Screenshot 2023-06-12 214533.png";
import paper from "../assets/images/Screenshot 2023-06-12 214334.png";
import cameraImg from "../assets/images/—Pngtree—cartoon flat camera_7009822.png";

// MODEL CREATOR
import createMyVision from "../utils/gestureConfiguration";

// COMPONENTS
import WebcamComponent from "../components/funcComponents/Webcam";
import Button from "../components/funcComponents/Button";

// GESTURE MODEL
let handGestureModel;

// WEBCAM FIXED PARAMS
const videoConstraints = {
  width: 480,
  height: 360,
  facingMode: "user",
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.scissors = scissors;
    this.rock = rock;
    this.paper = paper;

    this.state = {
      myImg: null,
      userScore: 0,
      cpuScore: 0,
      userChoices: [],
      cpuChoices: [],
    };
  }

  componentDidMount() {
    // ON MOUNT CREATES THE GESTURE MODEL

    createMyVision().then((configurator) => {
      handGestureModel = configurator;
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // EVERYTIME A USER GETS A NEW IMAGE IT GETS CONVERTED FROM BASE64 AND ANALYZED FROM THE MODEL
    if (prevState.myImg !== this.state.myImg && this.state.myImg !== null) {
      const imageElement = new Image();
      imageElement.onload = () => {
        const gestureRecognitionResult =
          handGestureModel.recognize(imageElement);
        console.log(gestureRecognitionResult);
        this.buttonCallback(
          gestureRecognitionResult.gestures[0][0].categoryName
        );
      };
      imageElement.src = this.state.myImg;
    }
  }

  // CALLBACK CALLED FROM THE WEBCAM COMPONENT WHEN THE USER GETS A PHOTO
  listenToImageCaptured = (myScreenshot) => {
    this.setState({
      myImg: myScreenshot,
    });
  };

  // GENERATES A RANDOM CHOICE FOR THE CPU
  computerChoice = () => {
    const computerChoices = ["Open_Palm", "Closed_Fist", "Victory"];
    return computerChoices[Math.floor(Math.random() * computerChoices.length)];
  };

  // GETS TRIGGERED AFTER THE COMPONENT GETS UPDATED WITH THE IMAGE, USERCHOICE IN FACT ITS THE ANALISYS OF THE MODEL
  buttonCallback = (userChoice) => {
    const cpuChoice = this.computerChoice();
    this.handleScore(userChoice, cpuChoice);
  };

  // FUNCTION TO DECLARE ONLY THE RESULT OF A SINGLE ROUND
  roundResult = (userChoice, cpuChoice) => {
    if (userChoice === cpuChoice) {
      return "Pareggio";
    } else if (
      (userChoice === "Open_Palm" && cpuChoice === "Victory") ||
      (userChoice === "Victory" && cpuChoice === "Closed_Fist") ||
      (userChoice === "Closed_Fist" && cpuChoice === "Open_Palm")
    ) {
      return "Hai perso";
    }
    return "Hai vinto";
  };

  // GETS TRIGGERED AFTER BOTH CPU AND USER HAVE MADE A CHOICE
  handleScore = (userChoice, cpuChoice) => {
    // control to take only valid hand gestures
    if (
      userChoice !== "Victory" &&
      userChoice !== "Open_Palm" &&
      userChoice !== "Closed_Fist"
    ) {
      alert("INSERIRE SEGNO VALIDO");
      return;
    }

    // local variables
    let userScore = this.state.userScore;
    let cpuScore = this.state.cpuScore;
    let userMove = [...this.state.userChoices, userChoice];
    let cpuMove = [...this.state.cpuChoices, cpuChoice];

    // conditional statements that trigger roundResult() which only returns a string declaring the winner or a draw
    if (this.roundResult(userChoice, cpuChoice) === "Hai vinto") {
      userScore += 1;
    } else if (this.roundResult(userChoice, cpuChoice) === "Hai perso") {
      cpuScore += 1;
    }

    // conditional statements to end the game and reset the state to begin a new game
    if (this.state.userScore === 3) {
      userScore = 0;
      cpuScore = 0;
      userMove = [];
      cpuMove = [];
      alert(`Hai vinto!`);
    } else if (this.state.cpuScore === 3) {
      alert("Hai perso");
      userScore = 0;
      cpuScore = 0;
      userMove = [];
      cpuMove = [];
    }

    this.setState({
      userScore: userScore,
      cpuScore: cpuScore,
      userChoices: userMove,
      cpuChoices: cpuMove,
    });
  };

  // RETURN AN IMAGE ASSOCIATED WITH THE HAND GESTURE
  mapChoices = (item, key) => {
    let image;
    if (item === "Open_Palm") {
      image = this.paper;
    } else if (item === "Victory") {
      image = this.scissors;
    } else if (item === "Closed_Fist") {
      image = this.rock;
    }
    return (
      <div key={key}>
        <img src={image} />
      </div>
    );
  };

  render() {
    return (
      <div className="App">
        <div className="game-container">
          <div className="round-column">
            <h2>UTENTE</h2>
            {this.state.userChoices.length > 0 &&
              this.state.userChoices.map(this.mapChoices)}
          </div>
          <div className="webcam">
            <div>
              <h2>USER: {this.state.userScore}</h2>
              <h2>COMPUTER: {this.state.cpuScore}</h2>
            </div>
            <WebcamComponent
              audio={false}
              screenshotFormat="image/webp"
              videoConstraints={videoConstraints}
              imageCapturedCallback={this.listenToImageCaptured}
            />
            <Button cameraImg={cameraImg} />
          </div>
          <div className="round-column">
            <h2>CPU</h2>
            {this.state.cpuChoices.length > 0 &&
              this.state.cpuChoices.map(this.mapChoices)}
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
