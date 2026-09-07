import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import RecipeDetails from "./RecipeDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
    </Routes>
  );
}

export default App;