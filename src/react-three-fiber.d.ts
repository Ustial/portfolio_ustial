// src/react-three-fiber.d.ts

import { PolychromeMaterial } from './materials/PolychromeMaterial';
import type { ReactThreeFiber } from '@react-three/fiber';

// Модульное расширение (module augmentation) для '@react-three/fiber':
// добавляем в ThreeElements запись про наш кастомный материал.
declare module '@react-three/fiber' {
  interface ThreeElements {
    // "polychromeMaterial" — имя нашего JSX-тэга (с маленькой буквы).
    // Описываем его типом Object3DNode<PolychromeMaterial, typeof PolychromeMaterial>.
    polychromeMaterial: ReactThreeFiber.Object3DNode<
      PolychromeMaterial,
      typeof PolychromeMaterial
    >;
  }
}
