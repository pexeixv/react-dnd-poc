import { useState, useEffect } from "react";
import { List, arrayMove } from "react-movable";

export default function ReactMovable() {
  const localStorageKey = "movableItems";

  const getInitialItems = () => {
    const storedItems = localStorage.getItem(localStorageKey);
    return storedItems
      ? JSON.parse(storedItems)
      : [
          "🍎 Apple",
          "🍌 Banana",
          "🥭 Mango",
          "🥝 Kiwi",
          "🍑 Peach",
          "🍍 Pineapple",
        ];
  };

  const [items, setItems] = useState(getInitialItems);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(items));
  }, [items]);

  return (
    <section>
      <div className="container mx-auto px-5 py-10">
        <h2 className="text-3xl font-bold">react-movable</h2>
        <a
          target="_blank"
          className="underline"
          href="https://www.npmjs.com/package/react-movable"
        >
          https://www.npmjs.com/package/react-movable
        </a>
        <List
          values={items}
          onChange={({ oldIndex, newIndex }) =>
            setItems(arrayMove(items, oldIndex, newIndex))
          }
          renderList={({ children, props }) => (
            <ul
              className="mt-10 flex flex-col gap-2 w-full max-w-sm"
              {...props}
            >
              {children}
            </ul>
          )}
          renderItem={({ value, props }) => (
            <li
              className="bg-slate-900 text-white cursor-pointer list-none p-2 text-center"
              {...props}
            >
              {value}
            </li>
          )}
        />
      </div>
    </section>
  );
}
