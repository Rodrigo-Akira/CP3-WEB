import React, { useEffect, useState } from 'react';

function WatchedPage() {
const [watchedMovies, setWatchedMovies] = useState([]);

    useEffect(() => {
    
    const savedWatchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
    setWatchedMovies(savedWatchedMovies);
}, []);

    return (
    <div>
    <h1>Filmes Assistidos</h1>
    <ul>
        {watchedMovies.length === 0 ? (
        <p>Você ainda não assistiu a nenhum filme.</p>
        ) : (
        watchedMovies.map((movie, index) => (
            <li key={index}>
            <h2>{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            </li>
        ))
        )}
    </ul>
    </div>
);
}

export default WatchedPage;
