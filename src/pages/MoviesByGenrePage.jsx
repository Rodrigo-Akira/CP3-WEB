import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

export default function MoviesByGenrePage() {
    const { id } = useParams(); 
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const API_KEY = '7c572a9f5b3ba776080330d23bb76e1e';
    const baseURL = 'https://api.themoviedb.org/3';

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
                        <MovieCard key={movie.id} {...movie} />
                    ))}
                </div>
            )}
        </div>
    );
}
