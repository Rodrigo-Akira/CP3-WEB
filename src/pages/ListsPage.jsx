import { useState, useEffect } from "react";
import { getMoviesFromStorage } from "../utils/localStorageUtils";

export default function MyListsPage() {
    const [toWatchMovies, setToWatchMovies] = useState([]);
    const [watchedMovies, setWatchedMovies] = useState([]);

    useEffect(() => {
        setToWatchMovies(getMoviesFromStorage("toWatchMovies"));
        setWatchedMovies(getMoviesFromStorage("watchedMovies"));
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center text-white mb-6">Minhas Listas de Filmes</h2>

            <h3 className="text-2xl font-semibold text-white mb-4">Filmes para ver depois</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {toWatchMovies.length > 0 ? (
                    toWatchMovies.map((filme) => (
                        <div key={filme.id} className="bg-gray-800 rounded-lg p-4 flex flex-col items-center">
                            <img
                                src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`}
                                alt={filme.title}
                                className="rounded-lg mb-4"
                            />
                            <h3 className="text-white font-semibold text-center mb-2">{filme.title}</h3>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-700 col-span-full">Nenhum filme para ver depois</p>
                )}
            </div>

            <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Filmes Assistidos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {watchedMovies.length > 0 ? (
                    watchedMovies.map((filme) => (
                        <div key={filme.id} className="bg-gray-800 rounded-lg p-4 flex flex-col items-center">
                            <img
                                src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`}
                                alt={filme.title}
                                className="rounded-lg mb-4"
                            />
                            <h3 className="text-white font-semibold text-center mb-2">{filme.title}</h3>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-700 col-span-full">Nenhum filme assistido</p>
                )}
            </div>
        </div>
    );
}
