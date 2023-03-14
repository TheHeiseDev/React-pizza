import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CartEmpty from "../components/CartEmpty";
import CartItemBlock from "../components/CartItem/CartItemBlock";
import SvgArrowLeft from "../components/IconComponents/SvgArrowLeft";
import SvgBusket from "../components/IconComponents/SvgBusket";
import SvgButtonClear from "../components/IconComponents/SvgButtonClear";

import { clearItems, selectCart } from "../store/slices/cartSlice/cartSlice";

const Cart: FC = () => {
  const dispatch = useDispatch();

  const { items, totalPrice } = useSelector(selectCart);
  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

  const onClickClear = () => {
    if (window.confirm("Очистить корзину?")) {
      dispatch(clearItems());
    }
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <SvgBusket />
            Корзина
          </h2>
          <div onClick={onClickClear} className="cart__clear">
            <SvgButtonClear />

            <span>Очистить корзину</span>
          </div>
        </div>
        <div className="content__items">
          {items.map((item: any) => (
            <CartItemBlock key={item.id} {...item} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Всего пицц: <b>{totalCount} шт.</b>
            </span>
            <span>
              Сумма заказа: <b>{totalPrice} ₽</b>
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <SvgArrowLeft />

              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
