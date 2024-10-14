import { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import FormInput from "./FormInput";
import { postRequestComment } from "../../utils/api";

function CreateComment({ onCommentAdded }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const { id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { content };
    const token = localStorage.getItem("token");

    try {
      const responseData = await postRequestComment(id, token, data);
      setError(null);
      setContent("");

      console.log("Comment created successfully:", responseData);
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Comment"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          id="content"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

CreateComment.propTypes = {
  onCommentAdded: PropTypes.func.isRequired,
};

export default CreateComment;
