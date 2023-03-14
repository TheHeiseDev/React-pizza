import { FC, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

type StatePizza = {
  imageUrl: string;
  title: string;
  price: number;
};

const FullPizas: FC = () => {
  const [pizza, setPizza] = useState<StatePizza>();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://63c3b1edf0028bf85f9c9068.mockapi.io/pizzas/${id}`
        );

        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы");
        navigate("/", { replace: true });
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <h2 className="container">Загрузка...</h2>;
  }

  return (
    <div className="container">
      <div className="fullpizzas">
        <img src={pizza.imageUrl} />
        <h2>{pizza.title}</h2>
        <br />
        <h3>{pizza.price} Руб.</h3>
      </div>
    </div>
  );
};

export default FullPizas;
