import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteArticle } from "../redux/articleSlice";
import { Form, Button, Modal } from "react-bootstrap";

export default function DeleteArticleModal({ onDeleteArticle }) {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    const existingArticles = JSON.parse(localStorage.getItem("articles")) || [];
    const updatedArticles = existingArticles.filter((article) => article.id !== Number(id));
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
    
    dispatch(deleteArticle(Number(id)));
    setId("");
    setIsModalOpen(false);
    
    // Вызываем функцию обратного вызова для обновления списка статей
    onDeleteArticle(Number(id));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <Button variant="danger" onClick={toggleModal}>
        Delete Article
      </Button>

      <Modal show={isModalOpen} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="articleId">
              <Form.Label>Article ID</Form.Label>
              <Form.Control
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter article ID"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
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