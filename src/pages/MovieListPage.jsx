import { useEffect, useState } from "react"; 
import MovieCard from "../components/MovieCard";

export default function MovieListPage() {
    const [search, setSearch] = useState("");
    const [filmes, setFilmes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [watchLater, setWatchLater] = useState([]);
    const [watched, setWatched] = useState([]);

    
    useEffect(() => {
        const loadMoviesFromLocalStorage = () => {
            const watchLaterMovies = localStorage.getItem("watchLater");
            const watchedMovies = localStorage.getItem("watched");
            setWatchLater(watchLaterMovies ? JSON.parse(watchLaterMovies) : []);
            setWatched(watchedMovies ? JSON.parse(watchedMovies) : []);
        };
        loadMoviesFromLocalStorage();
    }, []);

    const fetchMovies = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR&page=${page}`
            );
            const data = await res.json();
            if (data.results.length > 0) {
                setFilmes(prevFilmes => [...prevFilmes, ...data.results]);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSearchedMovies = async () => {
        if (!search) return; 
        setIsLoading(true);
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR&query=${search}`
            );
            const data = await res.json();
            setFilmes(data.results); 
            setHasMore(false); 
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (search) {
            fetchSearchedMovies(); 
        } else {
            fetchMovies(); 
        }
    }, [page, search]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setPage(1); 
        setHasMore(true); 
    };

    const loadMoreMovies = () => {
        if (hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const addToWatchLater = (movie) => {
        const updatedMovies = [...watchLater, movie];
        setWatchLater(updatedMovies);
        localStorage.setItem("watchLater", JSON.stringify(updatedMovies));
    };

    const addToWatched = (movie) => {
        const updatedMovies = [...watched, movie];
        setWatched(updatedMovies);
        localStorage.setItem("watched", JSON.stringify(updatedMovies));
    };

    const removeFromWatchLater = (id) => {
        const updatedMovies = watchLater.filter(movie => movie.id !== id);
        setWatchLater(updatedMovies);
        localStorage.setItem("watchLater", JSON.stringify(updatedMovies));
    };

    const removeFromWatched = (id) => {
        const updatedMovies = watched.filter(movie => movie.id !== id);
        setWatched(updatedMovies);
        localStorage.setItem("watched", JSON.stringify(updatedMovies));
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center text-white mb-6">Veja o catálogo completo de filmes</h2>
            <div className="flex justify-center mb-8">
                <input
                    className="w-full md:w-1/2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
                    type="text"
                    placeholder="Buscar filmes..."
                    value={search}
                    onChange={handleSearch}
                />
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {isLoading && page === 1 ? (
                    <p className="text-center text-gray-700 text-lg font-medium col-span-full">Carregando...</p>
                ) : filmes.length > 0 ? (
                    filmes.map(filme => (
                        <MovieCard 
                            key={filme.id} 
                            {...filme} 
                            addToWatchLater={addToWatchLater} 
                            addToWatched={addToWatched}
                            removeFromWatchLater={removeFromWatchLater}
                            removeFromWatched={removeFromWatched}
                            watchLater={watchLater}
                            watched={watched}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-700 text-lg font-medium col-span-full">Filme não encontrado</p>
                )}
            </section>

            {!search && hasMore && (
                <div className="text-center mt-8">
                    <button
                        onClick={loadMoreMovies}
                        className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Carregar mais filmes
                    </button>
                </div>
            )}
        </div>
    );
}
