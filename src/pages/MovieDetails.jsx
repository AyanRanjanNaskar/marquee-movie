import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/movie/${id}`,
          API_OPTIONS
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  


  if (isLoading) {
    return (
      <div className="mx-8 mt-8">
        <Navbar />
  
        <div className="bg-gray-800 w-full max-w-5xl p-6 rounded-lg mt-6">
          <Skeleton height={64} width="60%" />
  
          <div className="mt-4 space-y-2">
            <Skeleton height={16} />
            <Skeleton height={16} />
            <Skeleton height={16} width="80%" />
          </div>
  
          <div className="mt-6 space-y-2">
            <Skeleton height={16} width="40%" />
            <Skeleton height={16} width="50%" />
            <Skeleton height={16} width="30%" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!movie) return null;

  const {
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
    overview,
  } = movie;

  return (
    <div className="mx-8">
      <Navbar/>
      <div className='movie-card lg:flex gap-8'>
        <img src={poster_path?`https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={title} className="w-[300px] h-[500px] object-cover sm:w-auto" />
        <div className='mt-4'>
            <h2>{title}</h2>
            <p className="overview text-gray-500 w-auto mt-4">{overview}</p>
            <div className="content flex flex-col justify-start items-start gap-4">
                <p className="lang">Language : {original_language}</p>
                <p className="year">Release Date : {release_date ? release_date: 'N/A'}</p>
                <div className="rating">
                  <img src="/star.svg" alt="Star Icon" />
                    <p> {vote_average? vote_average.toFixed(1): 'N/A'}</p>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
};

export default MovieDetails;
