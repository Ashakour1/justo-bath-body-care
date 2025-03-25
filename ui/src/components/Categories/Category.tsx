"use client";

import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Category } from "../../types/category.t";

type CategoryProps = {
  category: Category;
  index?: number;
};

const Category = ({ category, index = 0 }: CategoryProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="flex justify-center"
    >
      <Link
        to="#"
        className="group flex flex-col items-center"
        aria-label={`View ${category.name} category`}
      >
        <div className="relative rounded-full overflow-hidden border border-gray-100 w-[140px] h-[140px] md:w-[180px] md:h-[180px] mb-3 transition-all duration-300 group-hover:shadow-md">
          <motion.img
            src={category.image || "/placeholder.svg"}
            alt=""
            width={180}
            height={180}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            initial={{ scale: 1.1 }}
            animate={isInView ? { scale: 1 } : { scale: 1.1 }}
            transition={{ duration: 0.7 }}
          />
        </div>

        <motion.span
          className="font-medium text-center block transition-colors duration-300 group-hover:text-[#d4b499]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
        >
          {category.name}
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default Category;
