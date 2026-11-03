import { useEffect, useState, useMemo, useCallback  } from "react";
import { Link } from "react-router";
import Loader from "./components/Loader";
import Header from "./components/Header";
import CallToAction from "./components/CallToAction";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";


function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debounce, setDebounce] = useState ("");
  const [currentPage, setCurrentPage] = useState(1);

  const recipesPerPage = 4;

const dailyLetter = useMemo(() => {
  const letters = "abcdefghijklmnopqrstuvwxyz";

  const today = new Date();

  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / 86400000
  );

  return letters[dayOfYear % letters.length];
}, []);

 useEffect(() => {
  const getInitialRecipes = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${dailyLetter}`);

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
 }, [dailyLetter]);

const fetchRecipes = useCallback(async (searchTerm) => {
  try {
    setLoading(true);
    setError("");

    const url = searchTerm.trim()
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`
      : `https://www.themealdb.com/api/json/v1/1/search.php?f=${dailyLetter}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const data = await response.json();
    setRecipes(data.meals || []);

  } catch (error) {
    setError("Something went wrong while loading recipes");
  } finally {
    setLoading(false);
  }
}, [dailyLetter]);

 useEffect(() => {
    const timer = setTimeout(() => {
        setDebounce(search);
        setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
}, [search]);

useEffect(() => {
    fetchRecipes(debounce);
}, [debounce, fetchRecipes]);

const handleSubmit = (e) => {
  e.preventDefault();
  setDebounce(search);
  setCurrentPage(1);
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

  return (
    <>
    <Header />
    <main className=" min-h-screen p-6">
     
<CallToAction />
      <section>
        <SearchBar 
        search={search}
        setSearch={setSearch}
        handleSubmit={handleSubmit}

        />
      </section>

      <section className="mt-10 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 ">
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

          <Pagination
          currentPage={currentPage}
  setCurrentPage={setCurrentPage}
  totalPages={totalPages}
          />
          </>
        )}
      </section>
    </main>
    </>
  );
}

export default Home;