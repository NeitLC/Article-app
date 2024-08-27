import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addArticle } from "../redux/articleSlice";
import { Form, Button, Modal } from "react-bootstrap";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddArticleModal({ onAddArticle }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [rate, setRate] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const notify = () => {
    toast.success('Article added successfully!', {
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
    const newArticle = {
      id: existingArticles.length + 1,
      type: "add",
      title,
      body,
      tags: tags.split(",").map((tag) => tag.trim()),
      rate,
    };

    const updatedArticles = [...existingArticles, newArticle];
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
    
    setTitle("");
    setBody("");
    setTags("");
    setRate(1);
    dispatch(addArticle(newArticle));
    setIsModalOpen(false);

    // Вызываем функцию обратного вызова для обновления списка статей
    onAddArticle(newArticle);
    notify();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <Button variant="primary" onClick={toggleModal}>
        Add Article
      </Button>

      <Modal show={isModalOpen} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="articleTitle">
              <Form.Label>Article Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter article title"
              />
            </Form.Group>
            <Form.Group controlId="articleBody">
              <Form.Label>Article Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Enter article body"
              />
            </Form.Group>
            <Form.Group controlId="articleTags">
              <Form.Label>Tags (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter article tags"
              />
            </Form.Group>
            <Form.Group controlId="articleRate">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                min={1}
                max={5}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Article
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}