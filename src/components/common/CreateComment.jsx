import { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import FormInput from "./FormInput";
import { postRequestComment } from "../../utils/api";
import ErrorMessage from "./ErrorMessage";

function CreateComment({ onCommentAdded }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const { id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { content };
    const token = localStorage.getItem("token");

    try {
      await postRequestComment(id, token, data);
      setError(null);
      setContent("");

      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mt-8">
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <FormInput
          label="Add a comment"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          id="content"
        />
        <button
          type="submit"
          className="self-start bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          Submit Comment
        </button>
      </form>
    </div>
  );
}

CreateComment.propTypes = {
  onCommentAdded: PropTypes.func.isRequired,
};

export default CreateComment;
