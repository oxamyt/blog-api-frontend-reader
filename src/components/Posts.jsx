import { useState, useEffect } from "react";

function Posts() {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("You are not authorized or failed to fetch posts");
      }

      const data = await response.json();
      setResponseData(data);
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

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {responseData && (
        <div>
          <h2>Response Data:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </>
  );
}

export default Posts;
