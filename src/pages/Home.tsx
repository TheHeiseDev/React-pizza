import React from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import Categories from "../components/Categories";
import SortPopup from "../components/SortPopup";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";

import { useSelector } from "react-redux";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice/filterSlice";

import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice/pizzaSlice";
import { useAppDispatch } from "../redux/store";
import { sortList } from "../data";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, isLoading } = useSelector(selectPizzaData);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    // URL params
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    // Get pizzas from the server and save to Redux
    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  // If there was a first render, then we check the URL parameters and save in the redux
  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)); // delete first symbol in the link (symbol: ?)
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: String(params.search),
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        })
      );

      isSearch.current = true;
    }
  }, []);

  // When first rendering, do not sew query parameters into the url
  // При первом рендеринге не вшивать параметры запроса в url
  // isMounted - The toggle switch responsible for this condition
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId: categoryId,
        currentPage: currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // If the parameters were changed and there was a first render
  // Если изменили парметры и был первый рендер
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
    //
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <SortPopup sort={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />)
          : items.map((pizza: any) => (
              <PizzaBlock key={pizza.id} link={`/pizza/${pizza.id}`} {...pizza} />
            ))}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
