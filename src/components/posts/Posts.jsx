import { useState, useEffect } from "react";
import { getPostsRequest } from "../../utils/api";
import ErrorMessage from "../common/ErrorMessage";

function Posts() {
  const [responseData, setResponseData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");

    try {
      const responseData = await getPostsRequest(
        "http://localhost:3000/posts/",
        token
      );

      setResponseData(responseData);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderPosts = () => {
    if (responseData.length === 0) {
      return;
    }

    return responseData.map((post) => (
      <div key={post.id}>
        <h2>Post title:{post.title}</h2>
        <p>Post content:{post.content}</p>
      </div>
    ));
  };

  return (
    <>
      {loading ? <p>Loading...</p> : <ErrorMessage message={error} />}
      {renderPosts()}
    </>
  );
}

export default Posts;
