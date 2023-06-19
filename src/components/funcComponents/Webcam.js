import React from "react";
import { useRef, useEffect } from "react";
import Webcam from "react-webcam";

import { DrawingUtils } from "@mediapipe/tasks-vision";

// import * as tf from "@tensorflow/tfjs";
// import * as handpose from "@tensorflow-models/handpose";
import { drawHand } from "../../utils/drawHand";

import createMyVision from "../../utils/gestureConfiguration";

let handGestureModel;

function WebcamComponent(props) {
  const cameraRef = useRef();
  const canvasRef = useRef();

  let myScreenshot;
  let myVideo;

  let gestureRecognitionResult;

  useEffect(() => {
    const capture = () => {
      myScreenshot = cameraRef.current.getScreenshot();
      props.imageCapturedCallback(myScreenshot);
    };
    // captureVideo();
    document.addEventListener("CaptureHandGesture", capture);
    createMyVision().then((config) => {
      handGestureModel = config;
    });
    return () => {
      document.removeEventListener("CaptureHandGesture", capture);
    };
  }, []);

  const captureVideo = () => {
    myVideo = cameraRef.current.getScreenshot();
    const imageElement = new Image();
    imageElement.onload = () => {
      try {
        gestureRecognitionResult = handGestureModel.recognize(imageElement);
      } catch (e) {
        console.log(e);
      }
    };
    imageElement.src = myVideo;
    requestAnimationFrame(() => {
      captureVideo();
    });

    setInterval(() => {
      detect(gestureRecognitionResult);
    }, 1000);
  };

  const detect = async (net) => {
    if (
      typeof cameraRef.current !== "undefined" &&
      cameraRef.current !== null &&
      cameraRef.current.video.readyState === 4
    ) {
      const video = cameraRef.current.video;
      const videoWidth = cameraRef.current.video.videoWidth;
      const videoHeight = cameraRef.current.video.videoHeight;

      cameraRef.current.video.width = videoWidth;
      cameraRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net;
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  return (
    <div>
      <Webcam
        audio={props.audio}
        ref={cameraRef}
        mirrored={true}
        height={props.height}
        screenshotFormat={props.screenshotFormat}
        width={props.width}
        videoConstraints={props.videoConstraints}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          zIndex: 9,
          width: 480,
          height: 360,
        }}
      />
    </div>
  );
}

export default WebcamComponent;
