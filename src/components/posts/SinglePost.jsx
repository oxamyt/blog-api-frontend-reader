import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateComment from "../common/CreateComment";
import { getSinglePostRequest } from "../../utils/api";
import ErrorMessage from "../common/ErrorMessage";
import DeleteComment from "../common/DeleteComment";
import EditComment from "../common/EditComment";

function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingComment, setEditingComment] = useState(null);

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

  const renderPost = () => {
    if (!post) {
      return <p className="text-red-500">Post not found.</p>;
    }

    return (
      <div key={post.id} className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
        <p className="text-gray-700 mb-6">{post.content}</p>

        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        {post.comments && post.comments.length > 0 ? (
          <ul className="space-y-4">
            {post.comments.map((comment) => (
              <li
                key={comment.id}
                className="p-4 bg-gray-100 rounded-md shadow-sm"
              >
                {editingComment === comment.id ? (
                  <EditComment
                    id={id}
                    commentId={comment.id}
                    initialComment={comment.content}
                    onCommentEdited={() => {
                      fetchSinglePost();
                      setEditingComment(null);
                    }}
                  />
                ) : (
                  <div>
                    <p className="text-gray-800">{comment.content}</p>
                    <p className="text-sm text-gray-500">
                      By: {comment.author.username}
                    </p>
                    <p className="text-xs text-gray-400">
                      Created at: {new Date(comment.createdAt).toLocaleString()}
                    </p>
                    <div className="mt-2 flex space-x-2">
                      <button
                        onClick={() => setEditingComment(comment.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <DeleteComment
                        id={id}
                        commentId={comment.id}
                        onCommentDeleted={fetchSinglePost}
                      />
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}

        <CreateComment onCommentAdded={fetchSinglePost} />
      </div>
    );
  };

  return (
    <>
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <ErrorMessage message={error} />}
      {renderPost()}
    </>
  );
}

export default SinglePost;
