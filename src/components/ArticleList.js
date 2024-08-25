import React, { useEffect, useState } from "react";
import Article from "./Article";
import articles from './articles.json';

export default function ArticleList() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Загружаем данные из localStorage
    let storedArticles = JSON.parse(localStorage.getItem('articles')) || [];

    // Если в localStorage нет данных, добавляем данные из articles.json
    if (storedArticles.length === 0) {
      storedArticles = articles;
      localStorage.setItem('articles', JSON.stringify(storedArticles));
    }

    setData(storedArticles);
  }, []);

  return (
    <div>
      {data.map((article) => (
        <Article key={article.id} {...article} />
      ))}
    </div>
  );
}

