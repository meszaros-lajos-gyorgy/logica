const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

const state = {
  dirty: true,
  screen: {
    width: 0,
    height: 0,
  },
  mouse: {
    pressed: false,
    posX: 0,
    posY: 0,
  },
};

const renderScene = () => {
  ctx.fillStyle = "#eaeaea";
  ctx.fillRect(0, 0, state.screen.width, state.screen.height);

  ctx.fillStyle = "rgb(200, 0, 0)";
  ctx.fillRect(10, 10, 50, 50);

  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  ctx.fillRect(30, 30, 50, 50);
};

const mainLoop = () => {
  if (state.dirty) {
    state.dirty = false;
    renderScene();
  }

  window.requestAnimationFrame(mainLoop);
};

const resizeCanvas = () => {
  if (
    state.screen.width !== window.innerWidth ||
    state.screen.height !== window.innerHeight
  ) {
    state.screen.width = window.innerWidth;
    state.screen.height = window.innerHeight;

    state.dirty = true;

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
    state.dirty = true;
  }
});
canvas.addEventListener("mouseup", (e) => {
  if (e.button === 0) {
    state.mouse.pressed = false;
    state.dirty = true;
  }
});
canvas.addEventListener("mousemove", (e) => {
  if (state.mouse.pressed) {
    state.mouse.posX = e.clientX;
    state.mouse.posY = e.clientY;
    state.dirty = true;
  }
});
