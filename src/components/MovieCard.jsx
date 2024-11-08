import { useState } from "react";
import { Link } from "react-router-dom";

export default function MovieCard({
    id,
    title,
    poster_path,
    addToWatchLater,
    addToWatched,
    removeFromWatchLater,
    removeFromWatched,
    watchLater = [],
    watched = [],
    showRemoveButton = false 
}) {
    const [addedToWatchLater, setAddedToWatchLater] = useState(watchLater.some(filme => filme.id === id));
    const [addedToWatched, setAddedToWatched] = useState(watched.some(filme => filme.id === id));

    const handleWatchLater = () => {
        addToWatchLater({ id, title, poster_path });
        setAddedToWatchLater(true);
    };
    const handleRemoveFromWatchLater = () => {
        removeFromWatchLater(id);
        setAddedToWatchLater(false);
    };

    
    const handleWatched = () => {
        addToWatched({ id, title, poster_path });
        setAddedToWatched(true);
    };
    const handleRemoveFromWatched = () => {
        removeFromWatched(id);
        setAddedToWatched(false);
    };

    return (
        <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center">
            <img 
                src={poster_path ? `https://image.tmdb.org/t/p/w200${poster_path}` : '/path/to/default-image.jpg'} 
                alt={title} 
                className="rounded-lg mb-4" 
            />
        
            <h3 className="text-white font-semibold text-center mb-2">{title}</h3>

            <div className="mt-4 flex flex-col space-y-4 w-full">
                
                {!addedToWatchLater ? (
                    <button
                        onClick={handleWatchLater}
                        className="py-2 px-4 w-full max-w-xs rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-0"
                    >
                        Minha Lista
                    </button>
                ) : (
                    <button
                        onClick={handleRemoveFromWatchLater}
                        className="py-2 px-4 w-full max-w-xs rounded-lg text-sm bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-0"
                    >
                        Remover da Minha Lista
                    </button>
                )}

                
                <button
                    onClick={handleWatched}
                    className={`py-2 px-4 w-full max-w-xs rounded-lg text-sm ${addedToWatched ? 'bg-gray-400' : 'bg-green-500'} text-white hover:bg-green-600 focus:outline-none focus:ring-0`}
                    disabled={addedToWatched}
                >
                    {addedToWatched ? 'Assistido' : 'Marcar como assistido'}
                </button>
            </div>

            
            {showRemoveButton && (
                <>
                    
                    <button
                        onClick={handleRemoveFromWatchLater}
                        className="mt-4 w-full max-w-xs bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-0"
                    >
                        Remover da Minha Lista
                    </button>

                
                    <button
                        onClick={handleRemoveFromWatched}
                        className="mt-4 w-full max-w-xs bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-0"
                    >
                        Remover de Assistidos
                    </button>
                </>
            )}

            <Link 
                to={`/movies/${id}`} 
                className="text-blue-400 hover:text-blue-600 mt-4"
            >
                Saber mais
            </Link>
        </div>
    );
}
