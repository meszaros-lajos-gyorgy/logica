export const drawNorGate = (x, y, ctx) => {
  const size = 100;
  const centerOffset = {
    x: (size * 4) / 5,
    y: 0,
  };
  x -= centerOffset.x;
  y -= centerOffset.y;

  const arcTip = {
    x: size - Math.cos(Math.PI / 5) * size,
    y: Math.sin(Math.PI / 5) * size,
  };

  const path = new Path2D();

  path.arc(x - size, y, size, 0, Math.PI * 0.2, false);

  path.lineTo(x - arcTip.x + 70, y + arcTip.y);

  path.arc(
    x - arcTip.x + 70,
    y + arcTip.y - size * 2,
    size * 2,
    Math.PI / 2,
    Math.PI / 4,
    true
  );

  path.arc(
    x - arcTip.x + 70 + (Math.sin(Math.PI / 2) - 1) * (size * 2),
    y + size * 2 - arcTip.y,
    size * 2,
    -(Math.PI / 4),
    -(Math.PI / 2),
    true
  );

  path.lineTo(x - arcTip.x, y - arcTip.y);

  path.arc(x - size, y, size, -Math.PI * 0.2, 0, false);

  return path;
};
