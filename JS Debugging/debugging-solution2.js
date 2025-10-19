const PI = 3.14;
let area = 0;

function circleArea(radius) {
  const area = radius * radius * PI;
  return area;
}

area = circleArea(3);
console.log('Area with radius 3:', area);

area = circleArea(4);
console.log('Area with radius 4:', area);
