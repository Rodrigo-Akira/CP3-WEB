import { useEffect, useState } from "react";
import MovieCarousel from "./MovieCarousel";

export default function Home() {
    const [filmesPopulares, setFilmesPopulares] = useState([]);
    const [filmesTrending, setFilmesTrending] = useState([]);
    const [filmesUpcoming, setFilmesUpcoming] = useState([]);
    const [watchLaterMovies, setWatchLaterMovies] = useState([]);
    const [watchedMovies, setWatchedMovies] = useState([]);

    
    const addToWatchLater = (movie) => {
        const updatedMovies = [...watchLaterMovies, movie];
        localStorage.setItem("watchLater", JSON.stringify(updatedMovies));
        setWatchLaterMovies(updatedMovies);
    };

    const addToWatched = (movie) => {
        const updatedMovies = [...watchedMovies, movie];
        localStorage.setItem("watched", JSON.stringify(updatedMovies));
        setWatchedMovies(updatedMovies);
    };

    const removeFromWatchLater = (movieId) => {
        const updatedMovies = watchLaterMovies.filter(movie => movie.id !== movieId);
        localStorage.setItem("watchLater", JSON.stringify(updatedMovies));
        setWatchLaterMovies(updatedMovies);
    };

    
    const fetchMovies = async () => {
        try {
            const [respostaPopulares, respostaTrending, respostaUpcoming] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`),
                fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`),
                fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`)
            ]);

            const popularData = await respostaPopulares.json();
            const trendingData = await respostaTrending.json();
            const upcomingData = await respostaUpcoming.json();

            setFilmesPopulares(popularData.results);
            setFilmesTrending(trendingData.results);
            setFilmesUpcoming(upcomingData.results);
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        }
    };

    
    useEffect(() => {
        const storedWatchLater = localStorage.getItem("watchLater")
            ? JSON.parse(localStorage.getItem("watchLater"))
            : [];
        const storedWatched = localStorage.getItem("watched")
            ? JSON.parse(localStorage.getItem("watched"))
            : [];

        setWatchLaterMovies(storedWatchLater);
        setWatchedMovies(storedWatched);

        fetchMovies();
    }, []);

    return (
        <div className="space-y-8">
            
            <MovieCarousel
                titulo="Populares"
                movies={filmesPopulares}
                addToWatchLater={addToWatchLater}
                addToWatched={addToWatched}
                removeFromWatchLater={removeFromWatchLater}
                watchLater={watchLaterMovies}
                watched={watchedMovies}
            />
            
            <MovieCarousel
                titulo="Tendências da Semana"
                movies={filmesTrending}
                addToWatchLater={addToWatchLater}
                addToWatched={addToWatched}
                removeFromWatchLater={removeFromWatchLater}
                watchLater={watchLaterMovies}
                watched={watchedMovies}
            />
            
            <MovieCarousel
                titulo="Em Breve"
                movies={filmesUpcoming}
                addToWatchLater={addToWatchLater}
                addToWatched={addToWatched}
                removeFromWatchLater={removeFromWatchLater}
                watchLater={watchLaterMovies}
                watched={watchedMovies}
            />
        </div>
    );
}
