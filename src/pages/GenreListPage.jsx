import React, { useEffect, useState } from "react";
import GenreCard from "../components/GenreCard.jsx";


export default function GenreListPage() {
    const [genres, setGenres] = useState([]);
    const API_KEY = '7c572a9f5b3ba776080330d23bb76e1e';
    const baseURL = 'https://api.themoviedb.org/3';

    useEffect(() => {
        async function fetchGenres() {
            try {
                const response = await fetch(`${baseURL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`);
                const data = await response.json();
                setGenres(data.genres);
            } catch (error) {
                console.error("Erro ao buscar gêneros:", error);
            }
        }
        fetchGenres();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Gêneros de Filmes</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {genres.map((genre, index) => (
                    <GenreCard
                        key={genre.id}
                        genre={genre}
                        backgroundColor={`hsl(${index * 40}, 70%, 50%)`}
                    />
                ))}
            </div>
        </div>
    );
}
