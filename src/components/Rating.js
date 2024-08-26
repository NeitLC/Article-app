import React from "react";

export default function Rating({rate}) {
    const stars = [];
    for(let i = 0; i < rate; i++) {
        stars.push(<span key={i} className="bi bi-star-fill text-warning" />);
    }
    for(let i = rate; i < 5; i++) { // Изменяем цикл, чтобы добавить пустые звезды
        stars.push(<span key={`empty-${i}`} className="bi bi-star text-warning" />);
    }
    return (
        <div className="rating">Rate this article: {stars}</div>
    );
}