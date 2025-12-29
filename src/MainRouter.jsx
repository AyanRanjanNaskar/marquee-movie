import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import { useState } from "react";
import Intro from "./pages/Intro";

const MainRouter = () => {
	const [introDone, setIntroDone] = useState(false);
	return (
		<>
     {!introDone && <Intro onFinish={() => setIntroDone(true)} />}
      {introDone && <Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/movie/:id" element={<MovieDetails />} />
			</Routes>}
			
		</>
	);
};

export default MainRouter;
