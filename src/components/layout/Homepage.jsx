import { Link } from "react-router-dom";

function Homepage() {
  const username = localStorage.getItem("username");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Kitten's Digital Minimalism Blog!
        </h1>
        {username ? (
          <h2 className="text-stone-900 text-2xl no-underline font-bold">
            Welcome back, <span className="font-semibold">{username}</span>!
          </h2>
        ) : (
          <Link
            to="/auth/register"
            className="text-stone-900 text-2xl no-underline font-bold"
          >
            Please Register First
          </Link>
        )}
        <p className="mt-4 text-gray-600">
          Discover the best ways to beat digital addiction with digital
          minimalism!
        </p>
        <button className="mt-6 p-2 m-2 text-white border-2 border-transparent bg-stone-900 font-bold py-2 rounded-lg hover:bg-stone-100 hover:border-2 hover:border-black hover:text-black transition duration-300">
          <Link to="/posts">Dive into Posts!</Link>
        </button>
      </div>
    </div>
  );
}

export default Homepage;
