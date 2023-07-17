import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "../src/App";
import Navbar from "./components/navbar/Navbar";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Navbar />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);
