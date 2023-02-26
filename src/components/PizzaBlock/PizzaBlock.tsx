import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { typeNames } from "../../data";
import { addItem, selectCartItemById } from "../../redux/slices/cartSlice/cartSlice";
import { CartItem } from "../../redux/slices/cartSlice/typesCart";
import SvgPlus from "../IconComponents/SvgPlus";

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  link: string;
  rating: number;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
  link,
}) => {
  const dispatch = useDispatch();
  const addedCount = useSelector(selectCartItemById(id));

  const [activeType, setActiveType] = React.useState<number>(0);
  const [activeSize, setActiveSize] = React.useState<number>(0);

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <Link to={link}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => (
            <li
              key={typeId}
              className={activeType === typeId ? "active" : ""}
              onClick={() => setActiveType(typeId)}
            >
              {typeNames[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((obj, index) => (
            <li
              key={index}
              className={activeSize === index ? "active" : ""}
              onClick={() => setActiveSize(index)}
            >
              {obj} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <SvgPlus />
          <span>Добавить</span>
          {addedCount && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
