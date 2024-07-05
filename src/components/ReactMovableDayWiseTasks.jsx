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
      { name: `Day ${prevDays.length + 1}`, tasks: [], newTask: "" },
    ]);
  };

  const addTask = (e, dayIndex) => {
    e.preventDefault();
    const newTask = days[dayIndex].newTask.trim();
    if (newTask) {
      setDays((prevDays) =>
        prevDays.map((day, index) => {
          if (index === dayIndex) {
            return {
              ...day,
              tasks: [...day.tasks, newTask],
              newTask: "",
            };
          }
          return day;
        })
      );
      setTaskCounter(taskCounter + 1);
    }
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

  const handleNewTaskChange = (dayIndex, event) => {
    const value = event.target.value;
    setDays((prevDays) =>
      prevDays.map((day, index) => {
        if (index === dayIndex) {
          return {
            ...day,
            newTask: value,
          };
        }
        return day;
      })
    );
  };

  const deleteTask = (dayIndex, taskIndex) => {
    setDays((prevDays) =>
      prevDays.map((day, index) => {
        if (index === dayIndex) {
          return {
            ...day,
            tasks: day.tasks.filter((_, idx) => idx !== taskIndex),
          };
        }
        return day;
      })
    );
  };

  return (
    <section>
      <div className="container px-5 py-10 mx-auto">
        <h2 className="text-3xl font-bold">Day wise Tasks (react-movable)</h2>
        <div className="flex gap-4 mt-4">
          <button
            onClick={addDay}
            className="p-2 text-xs text-center text-white list-none cursor-pointer bg-slate-900 whitespace-nowrap"
          >
            <i className="mr-1 fas fa-plus"></i>
            Add Day
          </button>
          <button
            onClick={resetData}
            className="p-2 text-xs text-center text-white list-none bg-red-500 cursor-pointer whitespace-nowrap"
          >
            <i className="mr-1 fas fa-trash"></i>
            Reset Days
          </button>
        </div>
        <div className="grid grid-cols-2 gap-8 mt-8 lg:grid-cols-4">
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="mb-10">
              <div className="flex justify-between gap-4 mt-4">
                <h3 className="text-2xl font-bold">{day.name}</h3>
                <button
                  onClick={() => resetTasks(dayIndex)}
                  className="p-2 text-xs text-center text-white list-none bg-red-500 cursor-pointer whitespace-nowrap"
                >
                  <i className="mr-1 fas fa-trash"></i>
                  Reset Tasks
                </button>
              </div>

              <form
                onSubmit={(e) => addTask(e, dayIndex)}
                className="flex justify-between gap-4 mt-8"
              >
                <input
                  type="text"
                  placeholder="Add new task"
                  className="flex-1 h-10 px-2 border"
                  value={day.newTask}
                  maxLength={50}
                  minLength={1}
                  onChange={(e) => handleNewTaskChange(dayIndex, e)}
                />
                <button className="grid h-10 text-white list-none cursor-pointer bg-slate-900 place-items-center aspect-square">
                  <i className="fas fa-plus"></i>
                </button>
              </form>

              <List
                values={day.tasks}
                onChange={({ oldIndex, newIndex }) =>
                  handleTaskReorder(dayIndex, { oldIndex, newIndex })
                }
                renderList={({ children, props }) => (
                  <ul
                    className="flex flex-col w-full max-w-sm gap-2 mt-4"
                    {...props}
                  >
                    {children}
                  </ul>
                )}
                renderItem={({ value, props, index }) => (
                  <div className="flex gap-4" {...props}>
                    <li className="flex-1 p-2 text-center list-none bg-white border cursor-pointer border-slate-900">
                      {value}
                    </li>
                    <button
                      onClick={() => deleteTask(dayIndex, index)}
                      className="h-10 p-2 text-xs text-center text-white list-none bg-red-500 cursor-pointer aspect-square"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
