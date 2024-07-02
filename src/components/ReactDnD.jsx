import { useDrag } from "react-dnd";

export default function ReactDnD() {
  return <Card isDragging={true} text="Text" />;
}

function Card({ isDragging, text }) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      item: { text },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );
  return (
    <div ref={dragRef} style={{ opacity }}>
      {text}
    </div>
  );
}
