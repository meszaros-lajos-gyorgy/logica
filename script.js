const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

const state = {
  dirty: true,
  screen: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
};

const resizeCanvas = () => {
  if (
    state.screen.width !== window.innerWidth ||
    state.screen.height !== window.innerHeight
  ) {
    state.screen.width = window.innerWidth;
    state.screen.height = window.innerHeight;
    state.dirty = true;
  }
};

const draw = () => {
  ctx.fillStyle = "rgb(200, 0, 0)";
  ctx.fillRect(10, 10, 50, 50);

  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  ctx.fillRect(30, 30, 50, 50);
};

// ---------------------------

const render = () => {
  if (state.dirty) {
    state.dirty = false;
    draw();
  }

  window.requestAnimationFrame(render);
};

window.requestAnimationFrame(render);
window.addEventListener("resize", resizeCanvas, false);
