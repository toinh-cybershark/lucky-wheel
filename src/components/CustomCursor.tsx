import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const hasMouse = window.matchMedia("(pointer: fine)").matches;
    if (!hasMouse) return;

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    document.addEventListener("mousemove", move);
    document.body.style.cursor = "none";
    return () => {
      document.removeEventListener("mousemove", move);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <img
      src="/mouse.png"
      alt="cursor"
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: "74px",
        height: "64px",
        transform: "translate(-50%, -50%)", // căn giữa
      }}
    />
  );
}
