import React from "react";
import { Link } from "react-router-dom";

export default function GenreCard({ genre, backgroundColor }) {
    return (
        <Link to={`/genre/${genre.id}`} className="block">
            <div
                className="p-4 rounded-lg text-center text-white font-semibold"
                style={{ backgroundColor }}
            >
                {genre.name}
            </div>
        </Link>
    );
}
