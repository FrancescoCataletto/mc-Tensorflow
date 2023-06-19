import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";

let myGestureRecognizer;

export default async function createMyVision() {
  const myVision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  );

  myGestureRecognizer = await GestureRecognizer.createFromOptions(myVision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
    },
    numHands: 1,
  });

  return myGestureRecognizer;
}
