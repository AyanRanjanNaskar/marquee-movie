import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import MainRouter from "./MainRouter";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<SkeletonTheme baseColor="#202020" highlightColor="#444">
			<BrowserRouter>
				<MainRouter />
			</BrowserRouter>
		</SkeletonTheme>
	</StrictMode>
);
