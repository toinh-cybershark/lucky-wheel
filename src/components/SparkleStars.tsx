import { type ReactNode } from "react";

interface SparkleStarsProps {
  children?: ReactNode;
  className?: string;
}

interface Star {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const SparkleStars = ({ children, className = "" }: SparkleStarsProps) => {
  const stars: Star[] = [
    {
      x: 30,
      y: 35,
      size: 60,
      delay: 4,
      duration: 8,
    },
    {
      x: 80,
      y: 45,
      size: 60,
      delay: 8,
      duration: 8,
    },
  ];
  return (
    <div className={`relative w-full h-full ${className} `}>
      <style>{`
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          10% {
            opacity: 0.3;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 0.3;
            transform: scale(0.5);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .sparkle-star {
          position: absolute;
          pointer-events: none;
          z-index: 20;
        }

        .sparkle-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 2px;
          height: 2px;
          background: #fff;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          filter: blur(2px);
          box-shadow: 0 0 3px 5px #fff,
              0 0 5px 7px #ebecca,
              0 0 5px 3px #e8d6f5,
              0 0 10px 15px #fff;
        }

        .sparkle-ray {
          position: absolute;
          top: 50%;
          left: 50%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent);
          transform-origin: center;
        }

        .sparkle-ray-1 {
          width: 160%;
          height: 1.5px;
          transform: translate(-50%, -50%) rotate(0deg);
        }

        .sparkle-ray-2 {
          width: 160%;
          height: 1.5px;
          transform: translate(-50%, -50%) rotate(90deg);
        }

        .sparkle-ray-3 {
          width: 120%;
          height: 1px;
          transform: translate(-50%, -50%) rotate(45deg);
        }

        .sparkle-ray-4 {
          width: 120%;
          height: 1px;
          transform: translate(-50%, -50%) rotate(135deg);
        }
      `}</style>

      {/* Children ở dưới */}
      {children && <div className="relative z-10">{children}</div>}

      {/* Hiệu ứng sao lấp lánh ở trên */}
      {stars.map((star, index) => (
        <div
          key={index}
          className="sparkle-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `sparkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        >
          <div
            className="sparkle-core"
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
    </div>
  );
};
export default SparkleStars;
