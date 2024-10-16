import { useState } from "react";
import FormInput from "./FormInput";
import PropTypes from "prop-types";
import { putRequestComment } from "../../utils/api";

function EditComment({ id, commentId, initialComment, onCommentEdited }) {
  const [content, setContent] = useState(initialComment || "");
  const [error, setError] = useState(null);

  const handleEditComment = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await putRequestComment(id, commentId, { content }, token);
      onCommentEdited();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mt-4">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleEditComment} className="flex flex-col space-y-4">
        <FormInput
          label="Edit your comment"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          id="content"
        />
        <button
          type="submit"
          className="self-start bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Update Comment
        </button>
      </form>
    </div>
  );
}

EditComment.propTypes = {
  id: PropTypes.string.isRequired,
  commentId: PropTypes.number.isRequired,
  initialComment: PropTypes.string.isRequired,
  onCommentEdited: PropTypes.func.isRequired,
};

export default EditComment;
