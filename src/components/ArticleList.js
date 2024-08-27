import React, { useEffect, useState } from "react";
import Article from "./Article";
import articles from '../data/articles.json';
import AddArticleModal from "./AddArticleModal";
import DeleteArticleModal from "./DeleteArticleModal";
import { Row, Col } from 'react-bootstrap';

export default function ArticleList() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    let storedArticles = JSON.parse(localStorage.getItem('articles')) || [];

    if (storedArticles.length === 0) {
      storedArticles = articles.map((article, index) => ({
        ...article,
        id: index + 1
      }));
      localStorage.setItem('articles', JSON.stringify(storedArticles));
    }

    setData(storedArticles.reverse());
  }, []);

  const handleAddArticle = (newArticle) => {
    setData([newArticle, ...data]);
  };

  const handleDeleteArticle = (updatedArticles) => {
    setData(updatedArticles);
  };

  return (
    <div>
      {data.map((article) => (
        <Article key={article.id} {...article} />
      ))}
      <Row>
        <Col>
          <AddArticleModal onAddArticle={handleAddArticle} />
        </Col>
        <Col>
          <DeleteArticleModal articles={data} onDeleteArticle={handleDeleteArticle} />
        </Col>
      </Row>
    </div>
  );
}

