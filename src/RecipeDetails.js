import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./components/Loader";
import Header from "./components/Header";

function RecipeDetails() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        const result = await response.json();

        setRecipe(result.meals[0]);
      } catch (error) {
        console.error("Failed to fetch recipe", error);
      } finally {
        setLoading(false);
      }
    };

    getRecipe();
  }, [id]);

  if (loading) {
    return <Loader />
  }

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }


  const ingredients = Array.from({ length: 20 }, (_, index) => {
    const ingredient = recipe[`strIngredient${index + 1}`];
    const measure = recipe[`strMeasure${index + 1}`];

    return {
      ingredient,
      measure,
    };
  }).filter(item => item.ingredient?.trim());

  return (
    <div>
      <Header />
<div className="max-w-4xl mx-auto px-4 mt-6">

  <button
    className="text-white px-5 py-2 rounded-md mb-5 transition"
    onClick={() => window.history.back()}
  >
   Back
  </button>

  <img
    src={recipe.strMealThumb}
    alt={recipe.strMeal}
    className="w-full max-w-[450px] h-auto mx-auto rounded-lg"
  />

</div>
    <section className="text-center max-w-2xl mx-auto px-4 mt-8 mb-10">
  <h2 className="text-3xl sm:text-4xl font-bold mb-3">
    {recipe.strMeal}
  </h2>

  <div className="flex justify-center items-center gap-2 mb-5">
    <span className="text-sm font-semibold uppercase tracking-wider">
      Category
    </span>
    <span className="bg-[--color-secondary] px-4 py-1 rounded-full text-sm font-medium">
      {recipe.strCategory}
    </span>
  </div>

  {recipe.strYoutube && (
    <a
      href={recipe.strYoutube}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-[--color-primary] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
    >
      <span>▶</span>
      Watch Recipe Video
    </a>
  )}
</section>

      <section className="max-w-4xl mx-auto px-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Instructions</h2>

        <p className="text-gray-700 leading-8 whitespace-pre-line text-justify">
          {recipe.strInstructions}
        </p>
      </section>
      <section className="max-w-4xl mx-auto px-6 mt-8">
        <h2 className="text-2xl font-bold mt-8 mb-4">Ingredients</h2>

        <ul className="list-disc list-inside space-y-2 mb-20">
          {ingredients.map((item, index) => (
            <li key={index}>
              {item.measure} {item.ingredient}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default RecipeDetails;

