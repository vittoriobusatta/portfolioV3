import React, { useEffect, useMemo, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useTexture } from "@react-three/drei";
import { useRouter } from "next/router";
import { forwardRef } from "react";

gsap.defaults({
  duration: 2.5,
  ease: "power3.out",
});

const Plane = forwardRef(({ image, path, planeSettings, index }, ref) => {
  const $mesh = useRef();
  const $root = useRef();
  const { viewport } = useThree();
  const tex = useTexture(`/assets/${path}/${image?.src}.webp`);
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const { width, height, gap } = planeSettings;

  useEffect(() => {
    if ($mesh.current.material) {
      $mesh.current.material.uniforms.uRes.value.x = width;
      $mesh.current.material.uniforms.uRes.value.y = height;
    }
  }, [viewport, width, height]);

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTex: { value: tex },
        uRes: { value: { x: 1, y: 1 } },
        uImageRes: {
          value: { x: tex.source.data.width, y: tex.source.data.height },
        },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vec3 pos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
        }
      `,
      fragmentShader: /* glsl */ `
      uniform sampler2D uTex;
      uniform vec2 uRes;
      uniform vec2 uImageRes;

      /*------------------------------
      Background Cover UV
      --------------------------------
      u = basic UV
      s = screensize
      i = image size
      ------------------------------*/
      vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
        float rs = s.x / s.y; // Aspect screen size
        float ri = i.x / i.y; // Aspect image size
        vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); // New st
        vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; // Offset
        return u * s / st + o;
      }

      varying vec2 vUv;
      void main() {
        vec2 uv = CoverUV(vUv, uRes, uImageRes);
        vec3 color = texture2D(uTex, uv).rgb;
      
        // Calculer la luminosité
        float luminosity = dot(color, vec3(0.299, 0.587, 0.114));
      
        // Utiliser la luminosité pour les composantes de couleur
        vec3 grayscale = vec3(luminosity);
      
        gl_FragColor = vec4(grayscale, 1.0);
      }
      `,
    }),
    [tex]
  );

  const [posX, setPosX] = useState(index * (width + gap));

  useEffect(() => {
    setPosX(index * gap);
  }, [gap, index, planeSettings.width]);

  useEffect(() => {
    const hoverScale = hover ? 1.1 : 1;
    gsap.to($root.current.scale, {
      x: hoverScale,
      y: hoverScale,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [hover]);

  return (
    <group ref={ref}>
      <group
        ref={$root}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        onClick={() => {
          router.push(`/case/${path}`);
        }}
        position={[posX, 0, 0]}
      >
        <mesh ref={$mesh}>
          <planeGeometry args={[width, height, 30, 30]} />
          <shaderMaterial args={[shaderArgs]} />
        </mesh>
      </group>
    </group>
  );
});

export default Plane;
