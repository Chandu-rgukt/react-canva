import { Stage, Layer } from 'react-konva';

const Canvas = ({ stickers, onDragEnd, onDelete, stageRef }) => {
  console.log("Canvas rendering with stageRef:", stageRef);
  return (
    <Stage width={600} height={400} ref={stageRef}>
      <Layer>
        {stickers.map((sticker) => (
          <sticker.component
            key={sticker.id}
            image={sticker.image}
            x={sticker.x}
            y={sticker.y}
            draggable
            onDragEnd={(e) => onDragEnd(sticker.id, e)}
            onDblClick={() => onDelete(sticker.id)}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;