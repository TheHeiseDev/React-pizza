import { FC } from "react";
import { useDispatch } from "react-redux";

import { addItem, removeItem, minusItem } from "../../store/slices/cartSlice/cartSlice";
import { CartItem } from "../../store/slices/cartSlice/typesCart";

import SvgButtonMinus from "../IconComponents/SvgButtonMinus";
import SvgButtonPlus from "../IconComponents/SvgButtonPlus";
import SvgButtonRemove from "../IconComponents/SvgButtonRemove";

interface ICartItemProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
}

const CartItemBlock: FC<ICartItemProps> = ({
  id,
  title,
  price,
  imageUrl,
  size,
  type,
  count,
}) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(addItem({ id } as CartItem));
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
  };
  const onClickRemove = () => {
    if (window.confirm("Вы уверены, что хотите удалить товар?")) {
      dispatch(removeItem(id));
    }
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type} {size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <div
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <SvgButtonPlus />
        </div>
        <b>{count}</b>
        <div
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <SvgButtonMinus />
        </div>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div onClick={onClickRemove} className="cart__item-remove">
        <div className="button button--outline button--circle">
          <SvgButtonRemove />
        </div>
      </div>
    </div>
  );
};

export default CartItemBlock;
