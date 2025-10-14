import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.body.style.cursor = 'none';
    document.addEventListener('mousemove', updateCursorPosition);
    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);

  return (
    <div
      className="fixed z-[9999] pointer-events-none select-none flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-black text-[10px] font-bold"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      test
    </div>
  );
};

export default CustomCursor;
