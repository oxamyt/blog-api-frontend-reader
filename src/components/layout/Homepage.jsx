import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="mt-8 bg-white shadow-md rounded-lg p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to Kittens Blog!
        </h1>
        <p className="mt-4 text-gray-600">
          Discover the cutest kittens, heartwarming stories, and everything
          about our feline friends!
        </p>
        <button className="bg-stone-900 text-white font-bold p-2 rounded-xl mt-2">
          <Link to={"http://localhost:5173/posts"}>Dive into Blogs!</Link>
        </button>
      </div>
    </div>
  );
}

export default Homepage;
