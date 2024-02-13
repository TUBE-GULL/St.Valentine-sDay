import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Heart() {
   const rendererRef = useRef(null);

   useEffect(() => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      const container = document.getElementById('scene');
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      renderer.shadowMap.enabled = true;

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      const heartShape = new THREE.Shape();
      heartShape.moveTo(0, 0.5);
      heartShape.quadraticCurveTo(0.7, 0.8, 1, 0.5);
      heartShape.bezierCurveTo(1.1, 0.2, 0.8, -0.7, 0.09, -1);
      heartShape.bezierCurveTo(0.2, -0.9, -0.3, -0.7, -0.09, -1);
      heartShape.bezierCurveTo(-0.8, -0.7, -1.1, 0.2, -1, 0.5);
      heartShape.quadraticCurveTo(-0.7, 0.9, 0, 0.5);
      heartShape.closePath();

      const extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 5, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 };
      const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

      const material = new THREE.MeshBasicMaterial({ color: '#bb001c', side: THREE.DoubleSide, transparent: true, opacity: 0.9 });
      material.castShadow = true;

      const heartMesh = new THREE.Mesh(geometry, material);
      scene.add(heartMesh);

      const animate = (time) => {
         requestAnimationFrame(animate);

         heartMesh.rotation.x += 0.00;
         heartMesh.rotation.y += 0.002;

         material.opacity = 0.8 + Math.sin(time * 0.001) * 0.1; // Регулируйте амплитуду и скорость мигания здесь

         renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
         const newWidth = window.innerWidth;
         const newHeight = window.innerHeight;

         camera.aspect = newWidth / newHeight;
         camera.updateProjectionMatrix();

         renderer.setSize(newWidth, newHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
         container.removeChild(renderer.domElement);
      };
   }, []);

   return <div id="scene" />;
}

export default Heart;
