import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./components/Loader";

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
  const ingredient =recipe[`strIngredient${index + 1}`];
  const measure = recipe[`strMeasure${index + 1}`];

  return {
    ingredient,
    measure,
  };
}).filter(item => item.ingredient?.trim());

  return (
    <div>
      <h1 className="text-3xl">Recipe Details</h1>

      

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        width="400"
      />
<h2 className="text-3xl">{recipe.strMeal}</h2>
      <p>Category: {recipe.strCategory}</p>
     <a
  href={recipe.strYoutube}
  target="_blank"
  rel="noopener noreferrer"
  className="font-bold"
>
  Watch recipe video
</a>
      <ol>
      <li> <span className="font-bold">Instructions: </span>{recipe.strInstructions}</li>
      </ol>
      <h2 className="text-2xl">Ingredients</h2>
       <ul>
    {ingredients.map((item, index) => (
      <li key={index}>
        {item.measure} {item.ingredient}
      </li>
    ))}
  </ul>
    </div>
  );
}

export default RecipeDetails;