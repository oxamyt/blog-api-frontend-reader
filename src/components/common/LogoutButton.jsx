import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async (setError) => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;
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
    }
  };

  return (
    <>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default LogoutButton;
