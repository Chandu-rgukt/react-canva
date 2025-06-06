import { useState, useRef, useEffect } from 'react';
import useImage from 'use-image';
import Canvas from './components/Canvas';
import StickerButton from './components/StickerButton';
import { Image } from 'react-konva';
import './App.css';

const App = () => {
  const [stickers, setStickers] = useState([]);
  const [sticker1] = useImage('https://cdn-icons-png.flaticon.com/128/3069/3069162.png');
  const [sticker2] = useImage('https://cdn-icons-png.flaticon.com/128/2936/2936762.png');
  const [sticker3] = useImage('https://cdn-icons-png.flaticon.com/128/2922/2922705.png');
  const stageRef = useRef(null);

  const stickerUrls = [
    'https://cdn-icons-png.flaticon.com/128/3069/3069162.png',
    'https://cdn-icons-png.flaticon.com/128/2936/2936762.png',
    'https://cdn-icons-png.flaticon.com/128/2922/2922705.png',
  ];

  const stickerImages = [sticker1, sticker2, sticker3];

  useEffect(() => {
    console.log("Stage Ref after render:", stageRef.current);
  }, []);

  const snapToGrid = (value) => Math.round(value / 40) * 40;

  const addSticker = (index) => {
    setStickers([
      ...stickers,
      {
        id: Date.now(),
        image: stickerImages[index],
        component: Image,
        x: snapToGrid(50),
        y: snapToGrid(50),
      },
    ]);
  };

  const handleDragEnd = (id, e) => {
    setStickers(
      stickers.map((sticker) =>
        sticker.id === id
          ? { ...sticker, x: snapToGrid(e.target.x()), y: snapToGrid(e.target.y()) }
          : sticker
      )
    );
  };

  const handleDelete = (id) => {
    setStickers(stickers.filter((sticker) => sticker.id !== id));
  };

  const handleDownload = () => {
    setTimeout(() => {
      if (stageRef.current) {
        const dataURL = stageRef.current.toDataURL();
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'canvas.png';
        link.click();
      } else {
        console.error("Stage reference is not available.");
      }
    }, 100);
  };

  return (
    <div className="app">
      <div className="buttons">
        <StickerButton className="sticker-button" imageSrc={stickerUrls[0]} onClick={() => addSticker(0)} />
        <StickerButton className="sticker-button" imageSrc={stickerUrls[1]} onClick={() => addSticker(1)} />
        <StickerButton className="sticker-button" imageSrc={stickerUrls[2]} onClick={() => addSticker(2)} />
        <button className="download-button" onClick={handleDownload}>
          Download Canvas
        </button>
      </div>
      <div className="canvas-container">
        <Canvas
          stickers={stickers}
          onDragEnd={handleDragEnd}
          onDelete={handleDelete}
          stageRef={stageRef}
        />
      </div>
    </div>
  );
};

export default App;