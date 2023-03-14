import { memo, FC } from "react";
import { categories } from "../constants";

interface ICategoriesProps {
  value: number;
  onChangeCategory: (index: number) => void;
}

const Categories: FC<ICategoriesProps> = memo(({ value, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});
export default Categories;
