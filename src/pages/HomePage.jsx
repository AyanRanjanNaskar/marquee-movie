import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Search from "../components/Search";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import MovieCardSkeleton from "../components/MovieCardSkeleton";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${API_KEY}`,
	},
};

const HomePage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [movieList, setMovieList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
	const [page, setPage] = useState(1);

	useDebounce(
		() => {
			setDebounceSearchTerm(searchTerm);
			setPage(1);
		},
		500,
		[searchTerm]
	);

	const fetchMovies = async (query = "", page = 1) => {
		setIsLoading(true);
		setErrorMessage("");
		try {
			const endpoint = query
				? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
						query
				  )}&page=${page}`
				: `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

			const response = await fetch(endpoint, API_OPTIONS);
			if (!response.ok) {
				throw new Error("Failed to fetch movies");
			}
			const data = await response.json();
			console.log(data);

			if (data.response == "False") {
				setErrorMessage(data.error || "Failed to fetch movies");
				setMovieList([]);
				return;
			}
			setMovieList(data.results || []);
		} catch (error) {
			console.error(`Error fetching movies: ${error}`);
			setErrorMessage("Error fetching movies. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleNextPage = () => {
		setPage((prevPage) => prevPage + 1);
	};

	const handlePrevPage = () => {
		setPage((prevPage) => Math.max(prevPage - 1, 1));
	};

	useEffect(() => {
		fetchMovies(debounceSearchTerm, page);
	}, [debounceSearchTerm, page]);

	return (
		<main>
			<div className="pattern" />

			<div className="wrapper">
				<header>
					<img src="./images/favicon.png" alt="logo" />
					<h1 className="self-edited">Marquee Movies </h1>
					<h1>
						Find <span className="text-gradient">Movies</span>{" "}
						You'll Enjoy Without the Hassle
					</h1>
				</header>
				<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				<section className="all-movies">
					<h2 className="mt-[40px]">All Movies</h2>

					<ul>
						{isLoading
							? Array.from({ length: 8 }).map((_, index) => (
									<MovieCardSkeleton key={index} />
							  ))
							: movieList.map((movie) => (
									<MovieCard key={movie.id} movie={movie} />
							  ))}
					</ul>


				</section>
				// page Navigation
				<div className="flex justify-center items-center gap-6 mt-10">
					<button
						onClick={handlePrevPage}
						disabled={page === 1}
						className="px-4 py-2 rounded bg-gray-700 text-white disabled:opacity-50">
						Previous
					</button>

					<span className="text-white font-semibold">
						Page {page}
					</span>

					<button
						onClick={handleNextPage}
						className="px-4 py-2 rounded bg-gray-700 text-white">
						Next
					</button>
				</div>
			</div>
		</main>
	);
};

export default HomePage;
