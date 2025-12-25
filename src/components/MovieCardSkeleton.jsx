import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieCardSkeleton = () => {
  return (
    <div className="movie-card animate-pulse">
      {/* Poster */}
      <Skeleton height={350} />

      {/* Text */}
      <div className="mt-4 space-y-2">
        <Skeleton height={20} width="80%" />
        <Skeleton height={16} width="60%" />
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
