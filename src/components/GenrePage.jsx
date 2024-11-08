import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

export default function GenrePage() {
    const { genreId } = useParams();
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const API_KEY = '7c572a9f5b3ba776080330d23bb76e1e';

    useEffect(() => {
        async function fetchMoviesByGenre() {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${genreId}`);
                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                console.error("Erro ao buscar filmes do gênero:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMoviesByGenre();
    }, [genreId]);

    return (
        <div className="container mx-auto p-4">
            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-4">Filmes do Gênero</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {movies.map(movie => (
                            <MovieCard key={movie.id} {...movie} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
