import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import Intro from "./components/Intro";
import { SplitText } from "gsap/all";
import gsap from "gsap";

// animation
gsap.registerPlugin(SplitText);

const MainRouter = () => {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <Intro onFinish={() => setIntroDone(true)}  />}

      {introDone && (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      )}
    </>
  );
};

export default MainRouter;
