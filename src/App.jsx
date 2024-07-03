import Hero from "./components/Hero";
import RBD from "./components/RBD";
import ReactMovable from "./components/ReactMovable";
import ReactMovableDayWiseTasks from "./components/ReactMovableDayWiseTasks";
import "./tailwind.css";

function App() {
  return (
    <>
      <Hero />
      <ReactMovableDayWiseTasks />
      <ReactMovable />
      <RBD />
    </>
  );
}

export default App;
