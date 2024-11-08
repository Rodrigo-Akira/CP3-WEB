import React from "react";

export default function CardContainer({ titulo, children }) {
    return (
        <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{titulo}</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4">
                {children}
            </div>
        </div>
    );
}
