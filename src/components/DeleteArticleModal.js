import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteArticle } from "../redux/articleSlice";
import { Form, Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteArticleModal({ onDeleteArticle }) {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [toastId, setToastId] = useState(null);
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

    const newToastId = toast.success('Article deleted successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      onClose: () => {
        // Clear the toastId state variable
        setToastId(null);
      },
    });
    setToastId(newToastId);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeToast = () => {
    if (toastId !== null) {
      toast.dismiss(toastId);
    }
  };

  return (
    <div>
      <ToastContainer />
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