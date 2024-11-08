import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom"; 
import MovieCard from "../components/MovieCard"; 

export default function MoviesByGenrePage() { 
    const { id } = useParams(); 
    const [movies, setMovies] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);


    const [watchLater, setWatchLater] = useState(() => {
        const savedWatchLater = localStorage.getItem("watchLater");
        return savedWatchLater ? JSON.parse(savedWatchLater) : [];
    }); 
    const [watched, setWatched] = useState(() => {
        const savedWatched = localStorage.getItem("watched");
        return savedWatched ? JSON.parse(savedWatched) : [];
    });

    const API_KEY = '7c572a9f5b3ba776080330d23bb76e1e'; 
    const baseURL = 'https://api.themoviedb.org/3';


    const addToWatchLater = (movie) => {
        const updatedWatchLater = [...watchLater, movie];
        setWatchLater(updatedWatchLater);
        localStorage.setItem("watchLater", JSON.stringify(updatedWatchLater)); 
    };

    const addToWatched = (movie) => {
        const updatedWatched = [...watched, movie];
        setWatched(updatedWatched);
        localStorage.setItem("watched", JSON.stringify(updatedWatched)); 
    };

    const removeFromWatchLater = (movieId) => {
        const updatedWatchLater = watchLater.filter(movie => movie.id !== movieId);
        setWatchLater(updatedWatchLater);
        localStorage.setItem("watchLater", JSON.stringify(updatedWatchLater)); 
    };

    const removeFromWatched = (movieId) => {
        const updatedWatched = watched.filter(movie => movie.id !== movieId);
        setWatched(updatedWatched);
        localStorage.setItem("watched", JSON.stringify(updatedWatched)); 
    };

    useEffect(() => {
        async function fetchMoviesByGenre() {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `${baseURL}/discover/movie?api_key=${API_KEY}&with_genres=${id}&language=pt-BR`
                );
                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                console.error("Erro ao buscar filmes do gênero:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchMoviesByGenre();
    }, [id]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Filmes do Gênero</h1>
            {isLoading ? (
                <p>Carregando filmes...</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {movies.map((movie) => (
                        <MovieCard 
                            key={movie.id} 
                            {...movie} 
                            addToWatchLater={addToWatchLater}
                            addToWatched={addToWatched}
                            removeFromWatchLater={removeFromWatchLater}
                            removeFromWatched={removeFromWatched}
                            watchLater={watchLater}
                            watched={watched}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
