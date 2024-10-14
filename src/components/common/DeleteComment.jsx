import { deleteRequestComment } from "../../utils/api";
import PropTypes from "prop-types";

function DeleteComment({ id, commentId, onCommentDeleted }) {
  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem("token");
    try {
      await deleteRequestComment(id, commentId, token);
      onCommentDeleted();
    } catch (error) {
      console.error(error.message);
    }
  };

  return <button onClick={() => handleDeleteComment(commentId)}>X</button>;
}

DeleteComment.propTypes = {
  id: PropTypes.string.isRequired,
  commentId: PropTypes.number.isRequired,
  onCommentDeleted: PropTypes.func.isRequired,
};

export default DeleteComment;
