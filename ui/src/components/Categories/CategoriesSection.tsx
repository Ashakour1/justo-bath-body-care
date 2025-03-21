import { Categories } from "../../data/categories-data";
import Category from "./Category";

const CategoriesSection = () => {
  return (
    <main className=" bg-[#fffef9] md:px-4 lg:px-0 px-4 py-10">
      <div className="container mx-auto">
        <div className="py-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Our Category</h2>
            <p className="text-gray-600">
              Our Products are designed for everyone
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-20 py-2 gap-2">
            {Categories.map((item, index) => (
              <Category key={index} category={item} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategoriesSection;
