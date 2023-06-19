import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Game from "../screens/Game";
import Home from "../screens/Home";
import Tutorial from "../screens/Tutorial";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="tutorial" element={<Tutorial />} />
        <Route path="game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
