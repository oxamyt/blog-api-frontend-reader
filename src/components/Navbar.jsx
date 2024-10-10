import { useState } from "react";

function Navbar() {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to logout. Please try again.");
      }

      const data = await response.json();
      setResponseData(data);
      localStorage.removeItem("token");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>

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

export default Navbar;
