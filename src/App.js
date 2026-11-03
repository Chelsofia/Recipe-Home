import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import RecipeDetails from "./RecipeDetails";



function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;