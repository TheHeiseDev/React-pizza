import React from "react";
import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";

function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sort: "rating",
  });

  React.useEffect(() => {
    setIsLoading(true);
    const order = sortType.sort.includes("-") ? "desc" : "asc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.sort.replace("-", "");
    axios
      .get(
        `https://63c3b1edf0028bf85f9c9068.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`
      )
      .then((response) => {
        setPizzas(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("Не удалось получить пиццы из сервера");
      });

    window.scrollTo(0, 0);
    //
  }, [categoryId, sortType]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => setCategoryId(id)}
        />
        <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <PizzaSkeleton key={index} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
}

export default Home;
