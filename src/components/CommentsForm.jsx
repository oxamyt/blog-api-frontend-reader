import { useState } from "react";
import { useParams } from "react-router-dom";

function CreateComment() {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const { id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { content };
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:3000/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create comment. Please try again.");
      }

      const responseData = await response.json();
      setError(null);
      setContent("");

      console.log("Comment created successfully:", responseData);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="content">Comment:</label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CreateComment;
