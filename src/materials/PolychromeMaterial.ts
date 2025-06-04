// -------------------------------------------
// 1) Импортируем необходимые модули:
//    - THREE  для Vector2 и остальных нужных типов
//    - shaderMaterial  — утилита из @react-three/drei, чтобы создать кастомный материал
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

// 2) Импортируем текст полногo шейдера из файла polychrome.fs
//    Мы будем вставлять его в шаблонную строку JS.
//    Чуть ниже заменим <PASTE_POLYCHROME_FS_CODE> на настоящий код из polychrome.fs.
//
//    Чтобы скопировать код, можешь зайти в файл shaders/polychrome.fs, скопировать весь текст
//    и здесь в шаблонную строку вставить. Важно: сохранять все символы GLSL точно.
//
//    Обрати внимание, что мы хотим добавить uniform `uMouse` (положение мыши)
//    и uniform `time` (чтобы анимировать шейдер).
const polychromeFragmentShader = `
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
}`;

// 3) Определяем наш кастомный материал PolychromeMaterial
//    shaderMaterial принимает три аргумента:
//    a) объект с начальными значениями uniform-переменных
//    b) код вершинного (vertex) шейдера
//    c) код фрагментного (fragment) шейдера
//
//    Мы будем использовать стандартный «pass-through» вершинный шейдер:
//    он передаёт координаты uv и вычисляет позицию вершины обычным способом.
export const PolychromeMaterial = shaderMaterial(
  // a) uniform–переменные и их начальные значения:
  {
    time: 0, // это uniform, который будем инкрементировать из кода React (useFrame)
    uMouse: new THREE.Vector2(0, 0), // здесь будут координаты мыши (-0.5..0.5)
  },
  // b) вершины (vertex shader):
  `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      // Стандартная проекция и позиционирование:
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // c) фрагментный шейдер (вставляем код из polychromeFragmentShader выше):
  polychromeFragmentShader
);

// 4) Чтобы R3F понимал <polychromeMaterial /> как React-компонент,
//    нужно его «extend»-нуть. Это делается в отдельном месте, обычно в компоненте сцены,
//    но мы можем просто экспортировать и дальше расширить в компоненте.
//
//    (Важно: здесь мы ничего не вызываем. Extending сделаем в самом React-компоненте.)
