import { Link } from "react-router-dom";

const Categories = () => {
  const products = [
    {
      name: "Bath & Body Works",
      img: "/product3.jpg",
    },
    {
      name: "Rituals",
      img: "/product3.jpg",
    },
    {
      name: "Justo Cosmetics",
      img: "/product4.jpg",
    },
    {
      name: "Perfumes",
      img: "/product5.jpg",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Our Category</h2>
          <p className="text-gray-600">
            Our Products are designed for everyone
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {products.map((product) => (
            <Link
              key={product.name}
              to="#"
              className="group flex flex-col items-center"
            >
              <div className="rounded-full overflow-hidden border border-gray-100 w-[140px] h-[140px] md:w-[180px] md:h-[180px] mb-3 transition-transform group-hover:scale-105">
                <img
                  src={product.img || "/placeholder.svg"}
                  alt={product.name}
                  width={180}
                  height={180}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium text-center">{product.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
