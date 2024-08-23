import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteArticle } from "./articlesSlice";
import Modal from "react-modal";

export default function DeleteArticleModal() {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    dispatch(deleteArticle(Number(id)));
    setId("");
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button onClick={toggleModal}>Delete Article</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Delete Article Modal"
      >
        <h3>Delete Article</h3>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Article ID"
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={toggleModal}>Close</button>
      </Modal>
    </div>
  );
}