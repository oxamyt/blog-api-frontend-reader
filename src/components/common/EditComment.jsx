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
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleEditComment}>
        <FormInput
          label="Comment"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          id="content"
        />
        <button type="submit">Update</button>
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
