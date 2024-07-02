import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const localStorageKey = "RBDItems";

const getInitialItems = () => {
  const storedItems = localStorage.getItem(localStorageKey);
  return storedItems
    ? JSON.parse(storedItems)
    : [
        { id: "1", text: "🍎 Apple" },
        { id: "2", text: "🍌 Banana" },
        { id: "3", text: "🥭 Mango" },
        { id: "4", text: "🥝 Kiwi" },
        { id: "5", text: "🍑 Peach" },
        { id: "6", text: "🍍 Pineapple" },
      ];
};

export default function ReactBeautifulDndExample() {
  const [items, setItems] = useState(getInitialItems());

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(items));
  }, [items]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems);
  };

  return (
    <section>
      <div className="container mx-auto px-5 py-10">
        <h2 className="text-3xl font-bold">react-beautiful-dnd</h2>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          href="https://www.npmjs.com/package/react-beautiful-dnd"
        >
          https://www.npmjs.com/package/react-beautiful-dnd
        </a>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <ul
                className="mt-10 flex flex-col gap-2 w-full max-w-sm"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-slate-900 text-white cursor-pointer list-none p-2 text-center"
                      >
                        {item.text}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </section>
  );
}
