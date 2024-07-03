import { useState, useEffect } from "react";
import { List, arrayMove } from "react-movable";

export default function ReactMovable() {
  const localStorageKey = "movableDays";
  const taskCounterKey = "taskCounter";

  const getInitialDays = () => {
    const storedDays = localStorage.getItem(localStorageKey);
    return storedDays ? JSON.parse(storedDays) : [];
  };

  const getInitialTaskCounter = () => {
    const storedCounter = localStorage.getItem(taskCounterKey);
    return storedCounter ? JSON.parse(storedCounter) : 1;
  };

  const resetData = () => {
    setDays([]);
    setTaskCounter(1);
    localStorage.removeItem(localStorageKey);
    localStorage.removeItem(taskCounterKey);
  };

  const [days, setDays] = useState(getInitialDays());
  const [taskCounter, setTaskCounter] = useState(getInitialTaskCounter());

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(days));
  }, [days]);

  useEffect(() => {
    localStorage.setItem(taskCounterKey, JSON.stringify(taskCounter));
  }, [taskCounter]);

  const addDay = () => {
    setDays((prevDays) => [
      ...prevDays,
      { name: `Day ${prevDays.length + 1}`, tasks: [] },
    ]);
  };

  const addTask = (dayIndex) => {
    setDays((prevDays) =>
      prevDays.map((day, index) => {
        if (index === dayIndex) {
          return {
            ...day,
            tasks: [...day.tasks, `Task ${taskCounter}`],
          };
        }
        return day;
      })
    );
    setTaskCounter(taskCounter + 1);
  };

  const resetTasks = (dayIndex) => {
    setDays((prevDays) =>
      prevDays.map((day, index) => {
        if (index === dayIndex) {
          return {
            ...day,
            tasks: [],
          };
        }
        return day;
      })
    );
  };

  const handleTaskReorder = (dayIndex, { oldIndex, newIndex }) => {
    setDays((prevDays) =>
      prevDays.map((day, index) => {
        if (index === dayIndex) {
          return {
            ...day,
            tasks: arrayMove(day.tasks, oldIndex, newIndex),
          };
        }
        return day;
      })
    );
  };

  return (
    <section>
      <div className="container mx-auto px-5 py-10">
        <h2 className="text-3xl font-bold">Day wise Tasks (react-movable)</h2>
        <div className="mt-4 flex gap-4">
          <button
            onClick={addDay}
            className="bg-slate-900 text-white cursor-pointer list-none p-2 text-center text-xs"
          >
            <i className="fas fa-plus mr-1"></i>
            Add Day
          </button>
          <button
            onClick={resetData}
            className="bg-red-500 text-white cursor-pointer list-none p-2 text-center text-xs"
          >
            <i className="fas fa-trash mr-1"></i>
            Reset Days
          </button>
        </div>
        <div className="grid gap-8 grid-cols-2 md:grid-cols-4 mt-8">
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="mb-10">
              <h3 className="text-2xl font-bold">{day.name}</h3>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => addTask(dayIndex)}
                  className="bg-slate-900 text-white cursor-pointer list-none p-2 text-center text-xs"
                >
                  <i className="fas fa-plus mr-1"></i>
                  Add Task
                </button>
                <button
                  onClick={() => resetTasks(dayIndex)}
                  className="bg-red-500 text-white cursor-pointer list-none p-2 text-center text-xs"
                >
                  <i className="fas fa-trash mr-1"></i>
                  Reset Tasks
                </button>
              </div>
              <List
                values={day.tasks}
                onChange={({ oldIndex, newIndex }) =>
                  handleTaskReorder(dayIndex, { oldIndex, newIndex })
                }
                renderList={({ children, props }) => (
                  <ul
                    className="mt-4 flex flex-col gap-2 w-full max-w-sm"
                    {...props}
                  >
                    {children}
                  </ul>
                )}
                renderItem={({ value, props }) => (
                  <li
                    className="border border-slate-900 cursor-pointer list-none p-2 text-center bg-white"
                    {...props}
                  >
                    {value}
                  </li>
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
