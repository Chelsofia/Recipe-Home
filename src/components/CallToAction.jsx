import PizzaImage from "../assets/images/pizza.jpg";

function CallToAction() {
  return (
   <section className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-lg mb-10 mx-auto">

  {/* Left side - Text */}
  <div className="flex-1 text-left">
    <h1 className="text-2xl font-bold text-white mb-4">
      Cooking Made Fun!
    </h1>

    <p className="text-white mb-6">
      Discover a world of delicious recipes and culinary inspiration.
      Whether you're a seasoned chef or just starting your cooking journey,
      our collection of recipes will help you create mouthwatering dishes
      that will impress your family and friends. Explore new flavors, learn
      cooking techniques, and make every meal a memorable experience.
      Start your culinary adventure today!
    </p>

    <button className="bg-orange-500 text-white px-5 py-3 rounded-md hover:bg-orange-600">
      Get Started
    </button>
  </div>

  {/* Right side - Image */}
  <div className="flex-1">
    <img
      src={PizzaImage}
      alt="Pizza"
      className="w-full max-w-[450px] h-auto rounded-lg mx-auto"
    />
  </div>

</section>
  );
}

export default CallToAction;