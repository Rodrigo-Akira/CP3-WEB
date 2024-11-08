import { Link } from "react-router-dom";

export default function MovieCard({ id, title, poster_path, backdrop_path, addToWatchLater, addToWatched }) {
    return (
        <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center">
            
            <img 
                src={`https://image.tmdb.org/t/p/w200${poster_path}`} 
                alt={title} 
                className="rounded-lg mb-4" 
            />
        
            <h3 className="text-white font-semibold text-center mb-2">{title}</h3>

            <div className="mt-4 flex space-x-2">
                <button
                    onClick={() => addToWatchLater({ id, title, poster_path })}
                    className="bg-blue-500 text-white py-1 px-3 rounded-lg text-sm"
                >
                    Adicionar a ver depois
                </button>
                <button
                    onClick={() => addToWatched({ id, title, poster_path })}
                    className="bg-green-500 text-white py-1 px-3 rounded-lg text-sm"
                >
                    Marcar como assistido
                </button>
            </div>

            <Link 
                to={`/movies/${id}`} 
                className="text-blue-400 hover:text-blue-600 mt-4"
            >
                Saber mais
            </Link>
        </div>
    );
}
