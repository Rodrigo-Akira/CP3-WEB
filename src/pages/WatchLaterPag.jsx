import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function WatchLaterPage() {
    const [watchLaterMovies, setWatchLaterMovies] = useState([]);


    useEffect(() => {
        const savedMovies = localStorage.getItem("watchLater");
        if (savedMovies) {
            setWatchLaterMovies(JSON.parse(savedMovies));
        }
    }, []);

    const addToWatchLater = (movie) => {
        const updatedList = [...watchLaterMovies, movie];
        setWatchLaterMovies(updatedList);
        localStorage.setItem("watchLater", JSON.stringify(updatedList));
    };

    const removeFromWatchLater = (movieId) => {
        const updatedList = watchLaterMovies.filter(movie => movie.id !== movieId);
        setWatchLaterMovies(updatedList);
        localStorage.setItem("watchLater", JSON.stringify(updatedList));
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center text-white mb-6">Minha Lista</h2>
            

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {watchLaterMovies.length > 0 ? (
                    watchLaterMovies.map(filme => (
                        <MovieCard
                            key={filme.id}
                            {...filme}
                            addToWatchLater={addToWatchLater}
                            addToWatched={() => {}}
                            removeFromWatchLater={() => removeFromWatchLater(filme.id)} 
                            showRemoveButton={true} 
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-700 text-lg font-medium col-span-full">Nenhum filme na minha lista</p>
                )}
            </section>
        </div>
    );
}
