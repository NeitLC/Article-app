import React, { useEffect, useState } from "react";
import Article from "./Article";
import articles from './articles.json';
import AddArticleModal from "./AddArticleModal";

export default function ArticleList() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    let storedArticles = JSON.parse(localStorage.getItem('articles')) || [];

    // Если в localStorage нет статей, загружаем их из articles.json
    // и генерируем новые идентификаторы
    if (storedArticles.length === 0) {
      storedArticles = articles.map((article, index) => ({
        ...article,
        id: index + 1
      }));
      localStorage.setItem('articles', JSON.stringify(storedArticles));
    }

    setData(storedArticles);
  }, []);

  const handleAddArticle = (newArticle) => {
    setData([...data, newArticle]);
  };

  return (
    <div>
      <AddArticleModal onAddArticle={handleAddArticle} />
      {data.map((article) => (
        <Article key={article.id} {...article} />
      ))}
    </div>
  );
}

