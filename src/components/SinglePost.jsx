import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateComment from "./CommentsForm";

function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSinglePost = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }

      const data = await response.json();
      setPost(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSinglePost();
  }, [id]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {post && (
        <div>
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
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}

          <CreateComment />
        </div>
      )}
    </>
  );
}

export default SinglePost;
