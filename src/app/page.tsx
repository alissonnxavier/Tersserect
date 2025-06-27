'use client'

import { useEffect, useRef, useState } from "react";


export default function Home() {

  const canvasReferences = useRef<HTMLCanvasElement>(null);
  const contextReferences = useRef<CanvasRenderingContext2D | null>(null);

  const [isPressed, setIsPressed] = useState(false);
  const colors = [
    'black',
    'red',
    'green',
    'blue',
    'yellow',
    'purple',
  ];

  const clearCanvas = () => {
    const canvas = canvasReferences.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = 'white';
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  };

  const beginDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    contextReferences.current?.beginPath();
    contextReferences.current?.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY,
    );
    setIsPressed(true);
  };
  const updateDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPressed) return;

    contextReferences.current?.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY,
    );
    contextReferences.current?.stroke();
  };
  const endDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    contextReferences.current?.closePath();
    setIsPressed(false);
  };

  useEffect(() => {
    const canvas = canvasReferences.current;
    if (canvas) {
      canvas.width = 1000;
      canvas.height = 800;
    };

    const context = canvas ? canvas.getContext('2d') : null;
    if (context) {
      context.lineCap = 'round';
      context.strokeStyle = 'black';
      context.lineWidth = 5;
    }
    contextReferences.current = context;

    
  }, []);

  console.log(contextReferences.current);

  return (
    <div>
      <canvas
        className="border border-white bg-white "
        ref={canvasReferences}
        onMouseDown={beginDraw}
        onMouseMove={updateDraw}
        onMouseUp={endDraw}
      />
      <div>
        <button onClick={clearCanvas} className="bg-red-500 text-white p-2 rounded">
          Clear
        </button>
        {colors.map((color) => (
          <button
            style={{ backgroundColor: color, color: 'white' }}
            key={color}
            onClick={() => {
              if (contextReferences.current) {
                contextReferences.current.strokeStyle = color;
              }
            }}
            className="bg-gray-200 text-black p-2 rounded m-1">

          </button>
        ))}
      </div>
    </div>
  );
}
