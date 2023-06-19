import React from "react";

function TutorialCard(props) {
  return (
    <div style={{ width: "300px", height: "300px" }}>
      <img src={props.tutorialImg} style={{ width: "100%" }} />
    </div>
  );
}

export default TutorialCard;
