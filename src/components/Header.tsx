import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import logoSvg from "../assets/img/pizza-logo.svg";
import Search from "./Search/Search";
import { selectCart } from "../store/slices/cartSlice/cartSlice";
import SvgButtonDelimiter from "./IconComponents/SvgButtonDelimiter";

function Header() {
  const { pathname } = useLocation();
  const { items, totalPrice } = useSelector(selectCart);
  const isMountedHeaderComponemt = useRef(false);
  const totalCountPizza = items.reduce((sum: number, item: any) => sum + item.count, 0);

  useEffect(() => {
    if (isMountedHeaderComponemt.current) {
      const json = JSON.stringify(items);
      localStorage.setItem("cart", json);
    }
    isMountedHeaderComponemt.current = true;
  }, [items]);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        {pathname === "/" && <Search />}
        {pathname !== "/cart" && (
          <div className="header__cart">
            <Link to="/cart" className="button button--cart">
              <span>{totalPrice} ₽</span>
              <div className="button__delimiter"></div>
              <SvgButtonDelimiter />
              <span>{totalCountPizza}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
