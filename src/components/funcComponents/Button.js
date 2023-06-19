import React from "react";
const event = new CustomEvent("CaptureHandGesture");

function Button(props) {
  function dispatch() {
    document.dispatchEvent(event);
  }

  return (
    <div onClick={dispatch} style={{ width: "100px", height: "100px" }}>
      <img src={props.cameraImg} style={{ width: "100%" }} />
    </div>
  );
}

export default Button;
