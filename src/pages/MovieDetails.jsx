import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

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

  


  if (isLoading) return <Spinner/>;
  if (!movie) return null;

  const {
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
  } = movie;

  return (
    <div className='movie-card'>
        <img src={poster_path?`https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={title} />
        <div className='mt-4'>
            <h3>{title}</h3>
            <div className="content">
                <div className="rating">
                    <img src="star.svg" alt="Star Icon" />
                    <p>{vote_average? vote_average.toFixed(1): 'N/A'}</p>
                </div>
                <span>•</span>
                <p className="lang">{original_language}</p>
                <span>•</span>
                <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
            </div>
        </div>
    </div>
  );
};

export default MovieDetails;
