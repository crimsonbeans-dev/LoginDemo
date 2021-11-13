import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./screen/Home/Home";
import Second from "./screen/Second/Second";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const About = () => (
  <div>
    <h1>About</h1>
  </div>
);

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="second" element={<Second />} />
        <Route path="about" element={<About />} />
      </Routes>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
