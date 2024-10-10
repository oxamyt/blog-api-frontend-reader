import { useState, useEffect } from "react";

function Posts() {
  const [responseData, setResponseData] = useState(null);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to login. Please try again.");
    }
    const data = await response.json();
    setResponseData(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
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
