import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateComment from "../common/CreateComment";
import { getSinglePostRequest } from "../../utils/api";
import ErrorMessage from "../common/ErrorMessage";
import DeleteComment from "../common/DeleteComment";

function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSinglePost = async () => {
    try {
      const token = localStorage.getItem("token");

      const responseData = await getSinglePostRequest(id, token);

      setPost(responseData);
      setError(null);
    } catch (error) {
      setError(error.message);
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSinglePost();
  }, [id]);

  const handleCommentAdded = () => {
    fetchSinglePost();
  };

  const renderPost = () => {
    if (!post) {
      return <p>Post not found.</p>;
    }

    return (
      <div key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>

        <h3>Comments</h3>
        {post.comments && post.comments.length > 0 ? (
          <ul>
            {post.comments.map((comment) => (
              <li key={comment.id}>
                <p>{comment.content}</p>
                <p>By: {comment.author.username}</p>
                <p>
                  Created at: {new Date(comment.createdAt).toLocaleString()}
                </p>
                <DeleteComment
                  id={id}
                  commentId={comment.id}
                  onCommentDeleted={fetchSinglePost}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}

        <CreateComment onCommentAdded={handleCommentAdded} />
      </div>
    );
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <ErrorMessage message={error} />}
      {renderPost()}
    </>
  );
}

export default SinglePost;
