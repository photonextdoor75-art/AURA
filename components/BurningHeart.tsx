
import React, { useEffect, useRef, useState, useMemo } from 'react';

// --- TYPES ---
interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Point2D {
  x: number;
  y: number;
}

interface Face {
  indices: [number, number, number]; // Les indices des 3 sommets dans le tableau de points
  normal: Point3D; // La normale de la face pour la lumière
  centerZ: number; // Pour le tri en profondeur (Z-sorting)
  color: string; // La couleur calculée
}

// --- MATH UTILS ---

// Rotation autour de l'axe Y
const rotateY = (point: Point3D, angle: number): Point3D => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x * cos - point.z * sin,
    y: point.y,
    z: point.x * sin + point.z * cos,
  };
};

// Rotation autour de l'axe X (pour incliner légèrement le coeur)
const rotateX = (point: Point3D, angle: number): Point3D => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x,
    y: point.y * cos - point.z * sin,
    z: point.y * sin + point.z * cos,
  };
};

// Projection 3D vers 2D (Perspective)
const project = (point: Point3D, width: number, height: number): Point2D => {
  const fov = 400; // Champ de vision / Zoom
  const distance = 4; // Distance de la caméra (Réduite pour grossir l'objet)
  const scale = fov / (distance + point.z);
  return {
    x: point.x * scale + width / 2,
    y: -point.y * scale + height / 2, // Inversion Y car SVG y vers le bas
  };
};

// Produit vectoriel (Cross Product) pour trouver la normale
const crossProduct = (a: Point3D, b: Point3D): Point3D => {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
};

// Normaliser un vecteur
const normalize = (v: Point3D): Point3D => {
  const mag = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  return { x: v.x / mag, y: v.y / mag, z: v.z / mag };
};

// Produit scalaire (Dot Product) pour la lumière
const dotProduct = (a: Point3D, b: Point3D): number => {
  return a.x * b.x + a.y * b.y + a.z * b.z;
};

const BurningHeart: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [scalePulse, setScalePulse] = useState(1);
  const requestRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // --- CONFIGURATION ---
  const CANVAS_SIZE = 400;
  // Augmentation significative de la résolution pour "plus de polygones"
  const SEGMENTS_T = 30; // Latitude (Horizontal)
  const SEGMENTS_P = 30; // Longitude (Vertical)

  // --- GÉNÉRATION DU MAILLAGE (Une seule fois) ---
  const { vertices: initialVertices, faces: initialFaces } = useMemo(() => {
    const verts: Point3D[] = [];
    const fcs: Omit<Face, 'normal' | 'centerZ' | 'color'>[] = [];

    for (let i = 0; i <= SEGMENTS_T; i++) {
      const t = (Math.PI * i) / SEGMENTS_T; // 0 à PI
      
      for (let j = 0; j <= SEGMENTS_P; j++) {
        
        const param_t = (Math.PI * 2 * i) / SEGMENTS_T; // 0 à 2PI
        const param_p = (Math.PI * j) / SEGMENTS_P - (Math.PI/2); // -PI/2 à PI/2 pour l'épaisseur
        
        // Formule ajustée pour le volume max
        const scale = 0.11; // Facteur d'échelle augmenté pour remplir le canvas (était 0.015)
        
        const rawX = 16 * Math.pow(Math.sin(param_t), 3) * Math.cos(param_p);
        const rawY = (13 * Math.cos(param_t) - 5 * Math.cos(param_t * 2) - 2 * Math.cos(param_t * 3) - Math.cos(param_t * 4)) * Math.cos(param_p);
        const rawZ = 6 * Math.pow(Math.sin(param_t), 3) * Math.sin(param_p); // Z épaisseur

        verts.push({
          x: rawX * scale,
          y: rawY * scale, 
          z: rawZ * scale
        });
      }
    }

    // Création des faces (Triangles)
    for (let i = 0; i < SEGMENTS_T; i++) {
      for (let j = 0; j < SEGMENTS_P; j++) {
        const p1 = i * (SEGMENTS_P + 1) + j;
        const p2 = p1 + 1;
        const p3 = (i + 1) * (SEGMENTS_P + 1) + j;
        const p4 = p3 + 1;

        // Deux triangles par carré de la grille
        fcs.push({ indices: [p1, p2, p3] });
        fcs.push({ indices: [p2, p4, p3] });
      }
    }

    return { vertices: verts, faces: fcs };
  }, []);

  // --- BOUCLE D'ANIMATION ---
  const animate = (time: number) => {
    timeRef.current = time;
    
    // Rotation constante
    setRotation(time * 0.001); // Vitesse de rotation

    // Battement (Pulsation) complexe
    // un double battement type "boum-boum... boum-boum"
    const beat = (time / 1000) % 1.5; // cycle de 1.5s
    let scale = 1;
    if (beat < 0.15) {
      scale = 1 + Math.sin(beat * Math.PI / 0.15) * 0.1;
    } else if (beat > 0.25 && beat < 0.40) {
       scale = 1 + Math.sin((beat - 0.25) * Math.PI / 0.15) * 0.06;
    }
    setScalePulse(scale);

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // --- RENDU DES POLYGONES ---
  const renderedFaces = useMemo(() => {
    // 1. Transformation des sommets (Rotation + Scale)
    const transformedVertices = initialVertices.map(v => {
      let p = { x: v.x * scalePulse, y: v.y * scalePulse, z: v.z * scalePulse };
      p = rotateX(p, 0.2); // Légère inclinaison vers l'avant pour mieux voir le volume
      p = rotateY(p, rotation);
      return p;
    });

    // Direction de la lumière (Venant d'en haut à gauche)
    const lightDir = normalize({ x: -1, y: 1, z: 1 });

    // 2. Calcul des faces
    const facesToRender = initialFaces.map(face => {
      const v1 = transformedVertices[face.indices[0]];
      const v2 = transformedVertices[face.indices[1]];
      const v3 = transformedVertices[face.indices[2]];

      // Vecteurs du triangle
      const edge1 = { x: v2.x - v1.x, y: v2.y - v1.y, z: v2.z - v1.z };
      const edge2 = { x: v3.x - v1.x, y: v3.y - v1.y, z: v3.z - v1.z };

      // Normale de la face
      const normal = normalize(crossProduct(edge1, edge2));

      // Si la normale pointe à l'opposé de la caméra (Z positif est vers nous), on ne dessine pas (Backface culling)
      if (normal.z < 0) return null;

      // Calcul Lumière (Lambert shading)
      const intensity = Math.max(0, dotProduct(normal, lightDir));
      
      // Couleur "Obsidienne"
      const lightness = Math.pow(intensity, 3) * 60; 
      const color = `hsl(0, 0%, ${lightness}%)`;

      // Profondeur moyenne pour le tri (Painter's Algorithm)
      const centerZ = (v1.z + v2.z + v3.z) / 3;

      return {
        v1: project(v1, CANVAS_SIZE, CANVAS_SIZE),
        v2: project(v2, CANVAS_SIZE, CANVAS_SIZE),
        v3: project(v3, CANVAS_SIZE, CANVAS_SIZE),
        centerZ,
        color,
      };
    }).filter((f): f is NonNullable<typeof f> => f !== null);

    // 3. Tri des faces (Z-sort) : Les plus loin (Z petit/négatif) en premier
    facesToRender.sort((a, b) => a.centerZ - b.centerZ);

    return facesToRender;
  }, [initialVertices, initialFaces, rotation, scalePulse]);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
       {/* Lueur d'ambiance arrière */}
      <div className="absolute inset-0 bg-pink-900/10 blur-[80px] rounded-full pointer-events-none animate-pulse"></div>
      
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`} 
        className="overflow-visible drop-shadow-2xl"
        style={{ maxWidth: '500px', maxHeight: '500px' }}
      >
        <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>
        
        <g filter="url(#glow)">
            {renderedFaces.map((face, i) => (
            <polygon
                key={i}
                points={`${face.v1.x},${face.v1.y} ${face.v2.x},${face.v2.y} ${face.v3.x},${face.v3.y}`}
                fill={face.color}
                stroke={face.color}
                strokeWidth="0.5"
                strokeLinejoin="round"
            />
            ))}
        </g>
      </svg>
    </div>
  );
};

export default BurningHeart;
