import Plane from "@/components/Three/Plane";
import React, { useRef } from "react";
import db from "public/db.json";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { getPiramidalIndex, lerp } from "utils/utils";

const data = db.sort((a, b) => new Date(b.date.en) - new Date(a.date.en));

const planeSettings = {
  width: 1.4,
  height: 3,
  gap: 0.07,
};

function WorkClient() {
  const $items = useRef([]);

  const progress = useRef(0);
  const startX = useRef(0);
  const isDown = useRef(false);
  const speedWheel = 0.03;
  const speedDrag = -0.2;
  const oldProgress = useRef(0);
  const speed = useRef(0);

  const { viewport } = useThree();

  const displayItems = (item, index, active) => {
    const piramidalIndex = getPiramidalIndex($items.current, active)[index];
    gsap.to(item.position, {
      x: (index - active) * (planeSettings.width + planeSettings.gap),
      y: $items.current.length * -0.05 + piramidalIndex * 0.05,
    });
  };

  useFrame(() => {
    progress.current = Math.max(0, Math.min(progress.current, 100));
    const active =
      Math.floor(progress.current / 100) * ($items.current.length - 1);

    $items.current.forEach((item, index) => displayItems(item, index, active));
    speed.current = lerp(
      speed.current,
      Math.abs(oldProgress.current - progress.current),
      0.1
    );

    oldProgress.current = lerp(oldProgress.current, progress.current, 0.1);
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

  return (
    <group>
      <mesh
        position={[0, 0, -0.01]}
        onWheel={handleWheel}
        onPointerDown={handleDown}
        onPointerUp={handleUp}
        onPointerMove={handleMove}
        onPointerLeave={handleUp}
        onPointerCancel={handleUp}
      >
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial transparent={true} opacity={0} />
      </mesh>
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
    </group>
  );
}

export default WorkClient;
