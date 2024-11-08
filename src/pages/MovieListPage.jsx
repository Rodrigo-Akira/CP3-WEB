import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getMoviesFromStorage, saveMoviesToStorage } from "../data/localStorage";

export default function MovieListPage() {
    const [search, setSearch] = useState("");
    const [filmes, setFilmes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Listas de filmes do LocalStorage
    const [toWatchMovies, setToWatchMovies] = useState(getMoviesFromStorage("toWatchMovies"));
    const [watchedMovies, setWatchedMovies] = useState(getMoviesFromStorage("watchedMovies"));

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

    // Função para adicionar filmes às listas
    const addToWatchList = (filme) => {
        const updatedList = [...toWatchMovies, filme];
        setToWatchMovies(updatedList);
        saveMoviesToStorage("toWatchMovies", updatedList);
    };

    const addToWatchedList = (filme) => {
        const updatedList = [...watchedMovies, filme];
        setWatchedMovies(updatedList);
        saveMoviesToStorage("watchedMovies", updatedList);
    };

    const removeFromToWatchList = (filmeId) => {
        const updatedList = toWatchMovies.filter((movie) => movie.id !== filmeId);
        setToWatchMovies(updatedList);
        saveMoviesToStorage("toWatchMovies", updatedList);
    };

    const removeFromWatchedList = (filmeId) => {
        const updatedList = watchedMovies.filter((movie) => movie.id !== filmeId);
        setWatchedMovies(updatedList);
        saveMoviesToStorage("watchedMovies", updatedList);
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
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {isLoading && page === 1 ? (
                    <p className="text-center text-gray-700 text-lg font-medium col-span-full">Carregando...</p>
                ) : filmes.length > 0 ? (
                    filmes.map((filme) => (
                        <MovieCard
                            key={filme.id}
                            {...filme}
                            addToWatchList={addToWatchList}
                            addToWatchedList={addToWatchedList}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-700 text-lg font-medium col-span-full">Filme não encontrado</p>
                )}
            </section>

            {!search && hasMore && (
                <div className="text-center mt-8">
                    <button
                        onClick={() => setPage(prevPage => prevPage + 1)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                        Carregar Mais Filmes
                    </button>
                </div>
            )}
        </div>
    );
}
