import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addArticle } from "../redux/articleSlice";
import Modal from "react-modal";

export default function AddArticleModal() {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [rate, setRate] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    const article = {
      type: "add",
      body,
      tags: tags.split(",").map((tag) => tag.trim),
      rate,
    };
    dispatch(addArticle(article));
    setBody("");
    setTags("");
    setRate(1);
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button onClick={toggleModal}>Add Article</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Add Article Modal"
      >
        <h3>Add Article</h3>
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Article body"
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma-separated)"
        />
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          min={1}
          max={5}
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={toggleModal}>Close</button>
      </Modal>
    </div>
  );
}