import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteArticle } from "../redux/articleSlice";
import { Form, Button, Modal, ListGroup } from "react-bootstrap";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteArticleModal({ articles, onDeleteArticle }) {
  const dispatch = useDispatch();
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleArticleSelect = (articleId) => {
    if (selectedArticles.includes(articleId)) {
      setSelectedArticles(selectedArticles.filter((id) => id !== articleId));
    } else {
      setSelectedArticles([...selectedArticles, articleId]);
    }
  };

  const notify = () => {
    toast.success('Articles Deleted Succsessfully', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const handleSubmit = () => {
    const existingArticles = JSON.parse(localStorage.getItem("articles")) || [];
    const updatedArticles = existingArticles.filter((article) => !selectedArticles.includes(article.id));
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
    
    dispatch(deleteArticle(selectedArticles));
    setSelectedArticles([]);
    setIsModalOpen(false);
    onDeleteArticle(updatedArticles);
    notify();
  };

  const handleShow = () => setIsModalOpen(true);
  const handleClose = () => {
    setSelectedArticles([]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button variant="danger" onClick={handleShow}>
        Delete Articles
      </Button>

      <Modal show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Articles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {articles.map((article) => (
              <ListGroup.Item key={article.id}>
                <Form.Check
                  type="checkbox"
                  label={article.title}
                  checked={selectedArticles.includes(article.id)}
                  onChange={() => handleArticleSelect(article.id)}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}