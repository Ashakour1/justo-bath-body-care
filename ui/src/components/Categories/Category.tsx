import { Link } from "react-router-dom";
import { type Category } from "../../types/category.t";

type CategoryProps = {
  category: Category;
};
const Category = ({ category }: CategoryProps) => {
  return (
    <div>
      <Link
        key={category.name}
        to="#"
        className="group flex flex-col items-center"
      >
        <div className="rounded-full overflow-hidden border border-gray-100 w-[140px] h-[140px] md:w-[180px] md:h-[180px] mb-3 transition-transform group-hover:scale-105">
          <img
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            width={180}
            height={180}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-medium text-center">{category.name}</span>
      </Link>
    </div>
  );
};

export default Category;
