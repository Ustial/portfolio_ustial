precision highp float;

uniform float time;
uniform vec2 uMouse;

varying vec2 vUv;

void main() {
  vec2 pos = vUv - uMouse;
  float angle = atan(pos.y, pos.x);
  float radius = length(pos);
  vec3 color = 0.5 + 0.5 * cos(time + angle + radius * 6.2831 + vec3(0.0, 2.0, 4.0));
  gl_FragColor = vec4(color, 1.0);
}
