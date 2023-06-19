const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

export const drawHand = (predictions, ctx) => {
  if (predictions.landmarks.length > 0) {
    predictions.landmarks.forEach((prediction) => {
      const landmarks = prediction;
      for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
        let finger = Object.keys(fingerJoints)[j];
        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k + 1];

          ctx.beginPath();
          ctx.moveTo(
            landmarks[firstJointIndex].x * 480,
            landmarks[firstJointIndex].y * 360
          );
          ctx.lineTo(
            landmarks[secondJointIndex].x * 480,
            landmarks[secondJointIndex].y * 360
          );
          ctx.strokeStyle = "plum";
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }

      for (let i = 0; i < landmarks.length; i++) {
        const x = landmarks[i].x * 480;
        const y = landmarks[i].y * 360;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 3 * Math.PI);

        ctx.fillStyle = "blue";
        ctx.fill();
      }
    });
  }
};
