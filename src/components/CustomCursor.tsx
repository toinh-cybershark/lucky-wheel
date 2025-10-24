import { useEffect, useRef, useState, type ReactNode } from "react";

interface CustomCursorProps {
  children: ReactNode;
}

export default function CustomCursor({ children }: CustomCursorProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hasMouse = window.matchMedia("(pointer: fine)").matches;
    if (!hasMouse) return;

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setPos({
        x: e.clientX - (rect.left - 30),
        y: e.clientY - (rect.top - 30),
      });
    };

    const handleEnter = () => {
      setIsInside(true);
    };

    const handleLeave = () => {
      setIsInside(false);
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseenter", handleEnter);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseenter", handleEnter);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${isInside ? "[&_*]:cursor-none" : ""}`}
    >
      {children}

      {isInside && (
        <img
          src="/mouse.png"
          alt="cursor"
          className="absolute pointer-events-none z-[9999]"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            width: "74px",
            height: "64px",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </div>
  );
}
