import { useEffect, useState } from "react";
import MovieCarousel from "./MovieCarousel"; 

export default function Home() {
    const [filmesPopulares, setFilmesPopulares] = useState([]);
    const [filmesTrending, setFilmesTrending] = useState([]);
    const [filmesUpcoming, setFilmesUpcoming] = useState([]);

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
        fetchMovies();
    }, []);

    return (
        <div className="space-y-8">
            <MovieCarousel titulo="Populares" movies={filmesPopulares} />
            <MovieCarousel titulo="Tendências da Semana" movies={filmesTrending} />
            <MovieCarousel titulo="Em Breve" movies={filmesUpcoming} />
        </div>
    );
}
