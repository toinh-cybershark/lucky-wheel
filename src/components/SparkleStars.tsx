import { useEffect, useState, useRef, type ReactNode } from "react";

interface SparkleStar {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

type Props = {
  children: ReactNode;
  density?: number;
};

const SparkleStars = ({ children, density = 6 }: Props) => {
  const [stars, setStars] = useState<SparkleStar[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createStar = (id: number): SparkleStar => ({
      id,
      x: Math.random() * 120,
      y: Math.random() * 120,
      size: Math.random() * 2 + 2.8,
      delay: Math.random() * 20,
      duration: Math.random() * 1 + 0.5,
    });

    setStars(Array.from({ length: density }, (_, i) => createStar(i)));

    const interval = setInterval(() => {
      setStars((prev) =>
        prev.map((star) => {
          // Khoảng 30% ngôi sao sẽ “nhấp nháy lại” (đổi vị trí)
          if (Math.random() < 0.3) {
            return createStar(star.id);
          }
          return star;
        })
      );
    }, 700); 

    return () => clearInterval(interval);
  }, [density]);

  return (
    <div
      ref={containerRef}
      className="relative inline-block "
      style={{ isolation: "isolate" }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="sparkle-star absolute z-20 pointer-events-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size * 15}px`,
            height: `${star.size * 15}px`,
            animation: `sparkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        >
          <div
            className="sparkle-core w-full h-full"
            style={{
              animation: `pulse ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
          <div className="sparkle-ray sparkle-ray-1" />
          <div className="sparkle-ray sparkle-ray-2" />
          <div className="sparkle-ray sparkle-ray-3" />
          <div className="sparkle-ray sparkle-ray-4" />
        </div>
      ))}

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SparkleStars;
