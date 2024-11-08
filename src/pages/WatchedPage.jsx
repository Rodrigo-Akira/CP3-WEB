import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function WatchedPage() {
    const [watchedMovies, setWatchedMovies] = useState([]);


    useEffect(() => {
        const savedMovies = localStorage.getItem("watched");
        if (savedMovies) {
            setWatchedMovies(JSON.parse(savedMovies));
        }
    }, []);


    const removeFromWatched = (movieId) => {
        const updatedList = watchedMovies.filter(movie => movie.id !== movieId);
        setWatchedMovies(updatedList); 
        localStorage.setItem("watched", JSON.stringify(updatedList)); 
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center text-white mb-6">Filmes Assistidos</h2>
            
            
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {watchedMovies.length > 0 ? (
                    watchedMovies.map(filme => (
                        <MovieCard
                            key={filme.id}
                            {...filme}
                            addToWatchLater={() => {}} 
                            addToWatched={() => {}} 
                            removeFromWatchLater={() => {}} 
                            removeFromWatched={() => removeFromWatched(filme.id)} 
                            showRemoveButton={true} 
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-700 text-lg font-medium col-span-full">Nenhum filme assistido</p>
                )}
            </section>
        </div>
    );
}
