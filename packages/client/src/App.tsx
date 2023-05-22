import { Grid } from "./pages/Grid";
import { Home } from "./pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/grid" element={<Grid />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};
