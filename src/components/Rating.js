import React from "react";

export default function Rating({rating}) {
    const stars = [];
    for(let i = 0; i < rating; i++) {
        stars.push(<span key={i} className="bi bi-star-fill text-warning" />);
    }
    for(let i = rating; i < 5; i++) { // Изменяем цикл, чтобы добавить пустые звезды
        stars.push(<span key={`empty-${i}`} className="bi bi-star text-warning" />);
    }
    return (
        <div className="rating">Rate this article: {stars}</div>
    );
}