import { useState } from "react";
import MovieCard from "../components/MovieCard";

export default function MovieCarousel({
    movies,
    titulo,
    addToWatchLater,
    addToWatched,
    removeFromWatchLater,
    watchLater,
    watched
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const filmesPorVez = 4;

    const nextMovies = () => {
        if (currentIndex + filmesPorVez < movies.length) {
            setCurrentIndex(currentIndex + filmesPorVez);
        }
    };

    const prevMovies = () => {
        if (currentIndex - filmesPorVez >= 0) {
            setCurrentIndex(currentIndex - filmesPorVez);
        }
    };

    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{titulo}</h2>

            <div className="flex justify-center space-x-4 overflow-hidden mb-6">
                {movies.slice(currentIndex, currentIndex + filmesPorVez).map(filme => (
                    <MovieCard
                        key={filme.id}
                        {...filme}
                        addToWatchLater={addToWatchLater}
                        addToWatched={addToWatched}
                        removeFromWatchLater={removeFromWatchLater}
                        watchLater={watchLater}
                        watched={watched}
                    />
                ))}
            </div>

            <div className="flex justify-center space-x-4">
                <button
                    onClick={prevMovies}
                    className="bg-gray-700 text-white px-6 py-2 rounded-lg"
                    disabled={currentIndex === 0}
                >
                    Anterior
                </button>
                <button
                    onClick={nextMovies}
                    className="bg-gray-700 text-white px-6 py-2 rounded-lg"
                    disabled={currentIndex + filmesPorVez >= movies.length}
                >
                    Próximo
                </button>
            </div>
        </div>
    );
}
