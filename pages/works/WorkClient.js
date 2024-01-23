import Plane from "@/components/Three/Plane";
import React, { useRef } from "react";
import db from "public/db.json";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";

const data = db.sort((a, b) => new Date(b.date.en) - new Date(a.date.en));

const planeSettings = {
  width: 1.8,
  height: 3,
  gap: 0.07,
};

function WorkClient() {
  const $items = useRef([]);

  const progress = useRef(0);
  const startX = useRef(0);
  const isDown = useRef(false);
  const speedWheel = 0.3;
  const speedDrag = -0.2;

  const displayItems = (item, index, active) => {
    gsap.to(item.position, {
      x: (index - active) * (planeSettings.width + planeSettings.gap),
      y: 0,
    });
  };

  useFrame(() => {
    const current = progress.current;
    const active = Math.floor(current / 100) * ($items.current.length - 1);
    $items.current.forEach((item, index) => {
      displayItems(item, index, active);
    });
  });

  const handleWheel = (e) => {
    const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
    const wheelProgress = isVerticalScroll ? e.deltaY : e.deltaX;
    progress.current = progress.current + wheelProgress * speedWheel;
  };

  const handleDown = (e) => {
    isDown.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handleUp = () => {
    isDown.current = false;
  };

  const handleMove = (e) => {
    if (!isDown.current) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const mouseProgress = (x - startX.current) * speedDrag;
    progress.current = progress.current + mouseProgress;
    startX.current = x;
  };

  const { viewport } = useThree();

  return (
    <group>
      <group>
        {data.map((item, index) => {
          return (
            <Plane
              ref={(ref) => ($items.current[index] = ref)}
              key={index}
              position={[index * 1.1, 0, 0]}
              image={item?.thumbnail?.thumb2}
              path={item?.path}
              planeSettings={planeSettings}
              index={index}
            />
          );
        })}
      </group>
      <mesh
        onWheel={handleWheel}
        onPointerDown={handleDown}
        onPointerUp={handleUp}
        onPointerMove={handleMove}
        position={[0, 0, -0.01]}
      >
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial transparent={true} opacity={0} />
      </mesh>
    </group>
  );
}

export default WorkClient;
