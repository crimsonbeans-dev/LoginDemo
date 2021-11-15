import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./screen/Home/Home";
import Second from "./screen/Second/Second";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const id =
  "pk_test_51JvGumSETABQuM8oUtfK1gG4lpcFFhh43EXTc3jpl7vaDhpxSxbIIi30SKRQjTfPpylWqlhtPQBJXaRWfR89hfcx00k0xqeyt4";
const secret =
  "sk_test_51JvGumSETABQuM8onsDOCOLPSSbb1zhoF7xmCGdkOZh1Ta9HrJuA1wW1asqzvyvxuX2xMTAgrjo9phgnXtVSjnKm002AZ58P9p";

const stripePromise = loadStripe(id);

// const options = {
//   // passing the client secret obtained from the server
//   clientSecret: '${pk_test_51JvGumSETABQuM8oUtfK1gG4lpcFFhh43EXTc3jpl7vaDhpxSxbIIi30SKRQjTfPpylWqlhtPQBJXaRWfR89hfcx00k0xqeyt4}_secret_${ca_Kb96uyQmV9C9ob1iLI89HViG7QplsY8H}',
// };
function App() {
  // console.log("stripePromise", stripePromise);
  return (
    <>
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="second" element={<Second />} />
        </Routes>
      </Elements>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
