export function getRotationFromMatrix(element: HTMLElement): number {
  const style = window.getComputedStyle(element);
  const transform = style.transform;

  if (transform === 'none' || !transform) {
    return 0;
  }

  // matrix(cos(θ), sin(θ), -sin(θ), cos(θ), tx, ty)
  const values = transform.split('(')[1].split(')')[0].split(',');
  const a = parseFloat(values[0]); // cos(θ)
  const b = parseFloat(values[1]); // sin(θ)

  // Tính góc bằng atan2, atan2 sẽ xử lý đúng các góc phần tư
  const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

  return angle;
}