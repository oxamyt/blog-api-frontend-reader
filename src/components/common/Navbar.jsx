import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

function Navbar() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to logout. Please try again.");
      }

      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button type="button" onClick={handleLogout} disabled={loading}>
        {loading ? "Logging out..." : "Logout"}
      </button>

      <ErrorMessage message={error} />
    </>
  );
}

export default Navbar;
