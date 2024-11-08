import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetailPage() {
    const { id } = useParams();
    const [filme, setFilme] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);  
    const [isLoading, setIsLoading] = useState(true);

    const fetchMovieDetails = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`);
            const data = await res.json();
            setFilme(data);

            const trailerRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}`);
            const trailerData = await trailerRes.json();
            setTrailer(trailerData.results[0]);

            const castRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}`);
            const castData = await castRes.json();
            setCast(castData.cast);
        } catch (error) {
            console.error("Erro ao buscar detalhes do filme:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMovieDetails();
    }, [id]);

    if (isLoading) return <p className="text-center text-xl font-semibold">Carregando...</p>;

    const elenco = cast.length > 0 ? cast.slice(0, 5).map(actor => actor.name).join(", ") : "Elenco não disponível";

    return (
        <div className="container mx-auto p-6">
            <div className="bg-gray-800 text-white shadow-lg rounded-lg p-6"> 
                <h1 className="text-4xl font-bold mb-4">{filme.title}</h1>
                <p className="text-lg mb-4">{filme.overview}</p>

                <div className="space-y-4 mb-6">
                    <p className="text-lg"><strong>Avaliação:</strong> {filme.vote_average}</p>
                    <p className="text-lg"><strong>Data de Lançamento:</strong> {filme.release_date}</p>
                    <p className="text-lg"><strong>Elenco:</strong> {elenco}</p>
                </div>
                
                
                {trailer && (
                    <div className="bg-black rounded-lg overflow-hidden mx-auto">
                        <iframe
                            className="mx-auto"
                            width="80%"  
                            height="600" 
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    );
}
