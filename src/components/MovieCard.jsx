import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieCard = ({movie:{title, vote_average, poster_path, release_date, original_language, id}}) => {
  return (
    <div className='movie-card' >
      <Link to={`/movie/${id}`}>
        <img src={poster_path?`https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png' || <Skeleton /> } alt={title} />
        <div className='mt-4'>
            <h3>{title}</h3>
            <div className="content">
                <div className="rating">
                    <img src="star.svg" alt="Star Icon" />
                    <p>{vote_average? vote_average.toFixed(1): 'N/A' } </p>
                </div>
                <span>•</span>
                <p className="lang">{original_language  } </p>
                <span>•</span>
                <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'  } </p>
            </div>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard