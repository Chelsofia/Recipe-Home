import { useEffect, useState } from "react";
import { Link } from "react-router";
import Loader from "./components/Loader";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const recipesPerPage = 12;

 useEffect(() => {
  const getInitialRecipes = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=r");

      if (!response.ok) {
        throw new Error("failed to fetch recipes");
      }
      const result = await response.json();
      setRecipes(result.meals || []);
    } catch (error) {
      setError("Something went wrong while loading recipes");
    } finally {
      setLoading(false);
    }
  };
  getInitialRecipes();
 }, []);

  const getRecipes = async () => {
    if (!search.trim()) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const result = await response.json();

      setRecipes(result.meals || []);
      setCurrentPage(1);
    } catch (error) {
      setError("Something went wrong while searching.");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  };

  const lastRecipeIndex = currentPage * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;

  const currentRecipes = recipes.slice(
    firstRecipeIndex,
    lastRecipeIndex
  );

  const totalPages = Math.ceil(
    recipes.length / recipesPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <main className="bg-[#9AC6C5] min-h-screen p-6">
      <h1 className="text-3xl text-center mt-8 mb-8 font-bold text-white">
        Chelsofia's Recipe Site
      </h1>

      <section>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto"
        >
          <div className="flex items-center w-full h-12 rounded-lg bg-white overflow-hidden border border-gray-200">
            <input
              className="h-full w-full outline-none text-sm text-gray-700 px-4"
              type="text"
              placeholder="Search recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              type="submit"
              className="bg-[#7785AC] text-white h-full px-5 hover:bg-orange-600"
            >
              Search
            </button>
          </div>
        </form>
      </section>

      <section className="mt-10 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Recipes
        </h2>

        {loading && (
          <p className="align-center">
            <Loader />
          </p>
        )}

        {error && (
          <p className="text-red-200 text-center">
            {error}
          </p>
        )}

        {!loading &&
          !error &&
          recipes.length === 0 && (
            <p className="text-white text-center">
              No recipes found.
            </p>
          )}

        {!loading && recipes.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentRecipes.map((recipe) => (
                <Link
                  to={`/recipe/${recipe.idMeal}`}
                  key={recipe.idMeal}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-bold text-lg">
                      {recipe.strMeal}
                    </h3>

                    <p className="text-gray-500 text-sm mt-2">
                      {recipe.strCategory}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-10">
                <button
                  onClick={previousPage}
                  disabled={currentPage === 1}
                  className="bg-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <span className="text-white font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="bg-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Home;