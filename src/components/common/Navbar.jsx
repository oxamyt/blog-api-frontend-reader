import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

function Navbar() {
  const [error, setError] = useState(null);

  return (
    <>
      <LogoutButton setError={setError} />
      <Link to={"http://localhost:5173/posts"}>Posts</Link>
      <ErrorMessage message={error} />
    </>
  );
}

export default Navbar;
