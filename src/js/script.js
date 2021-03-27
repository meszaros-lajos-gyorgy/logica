/* global R */

import { drawNorGate } from "./nor.js";

const { findLastIndex } = R;

const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

const state = {
  screen: {
    width: 0,
    height: 0,
  },
  mouse: {
    isOnScreen: false,
    pressed: false,
    posX: 300,
    posY: 200,
    prevPosX: 300,
    prevPosY: 200,
  },
};

const renderScene = () => {
  ctx.fillStyle = "#eaeaea";
  ctx.fillRect(0, 0, state.screen.width, state.screen.height);

  const paths = [
    drawNorGate(300, 200, ctx),
    drawNorGate(400, 250, ctx),
    drawNorGate(500, 300, ctx),
  ];

  const hoverIdx =
    state.mouse.isOnScreen &&
    findLastIndex((path) => {
      return ctx.isPointInPath(path, state.mouse.posX, state.mouse.posY);
    }, paths);

  paths.forEach((path, idx) => {
    if (idx === hoverIdx) {
      ctx.strokeStyle = "blue";
      ctx.fillStyle = "lightblue";
    } else {
      ctx.strokeStyle = "black";
      ctx.fillStyle = "lightgrey";
    }
    ctx.lineWidth = 3;
    ctx.fill(path);
    ctx.stroke(path);
  });
};

const mainLoop = () => {
  renderScene();

  window.requestAnimationFrame(mainLoop);
};

const resizeCanvas = () => {
  if (
    state.screen.width !== window.innerWidth ||
    state.screen.height !== window.innerHeight
  ) {
    state.screen.width = window.innerWidth;
    state.screen.height = window.innerHeight;

    canvas.width = state.screen.width;
    canvas.height = state.screen.height;
  }
};

window.requestAnimationFrame(mainLoop);

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
canvas.addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    state.mouse.pressed = true;
  }
});
canvas.addEventListener("mouseup", (e) => {
  if (e.button === 0) {
    state.mouse.pressed = false;
  }
});
canvas.addEventListener("mousemove", (e) => {
  state.mouse.posX = e.clientX;
  state.mouse.posY = e.clientY;
});
canvas.addEventListener("mouseover", () => {
  state.mouse.isOnScreen = true;
});
canvas.addEventListener("mouseout", () => {
  state.mouse.isOnScreen = false;
});
window.addEventListener("blur", () => {
  state.mouse.isOnScreen = false;
});
