// src/threeExtensions.ts
import { extend } from '@react-three/fiber';
import { PolychromeMaterial } from './materials/PolychromeMaterial';

// Регистрируем материал, чтобы можно было в JSX писать <polychromeMaterial />
extend({ PolychromeMaterial });
