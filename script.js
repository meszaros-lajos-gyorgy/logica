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
    posX: 300,
    posY: 200,
  },
};

const norGate = (x, y, ctx) => {
  const size = 100;
  const centerOffset = {
    x: (size * 4) / 5,
    y: 0,
  };
  x -= centerOffset.x;
  y -= centerOffset.y;

  ctx.fillStyle = "#000000";
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.arc(x - size, y, size, 0, Math.PI * 0.2, false);

  const arcTip = {
    x: size - Math.cos(Math.PI / 5) * size,
    y: Math.sin(Math.PI / 5) * size,
  };

  ctx.lineTo(x - arcTip.x + 70, y + arcTip.y);

  ctx.arc(
    x - arcTip.x + 70,
    y + arcTip.y - size * 2,
    size * 2,
    Math.PI / 2,
    Math.PI / 4,
    true
  );

  ctx.arc(
    x - arcTip.x + 70 + (Math.sin(Math.PI / 2) - 1) * (size * 2),
    y + size * 2 - arcTip.y,
    size * 2,
    -(Math.PI / 4),
    -(Math.PI / 2),
    true
  );

  ctx.lineTo(x - arcTip.x, y - arcTip.y);

  ctx.arc(x - size, y, size, -Math.PI * 0.2, 0, false);

  ctx.stroke();

  ctx.fillStyle = "orange";
  ctx.fillRect(x - 1 + centerOffset.x, y - 1 + centerOffset.y, 3, 3);
};

const renderScene = () => {
  ctx.fillStyle = "#eaeaea";
  ctx.fillRect(0, 0, state.screen.width, state.screen.height);

  norGate(state.mouse.posX, state.mouse.posY, ctx);
  // norGate(100, 100, ctx);
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
