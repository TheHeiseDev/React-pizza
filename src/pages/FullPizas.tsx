import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const FullPizas: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>({
    imageUrl: "",
    title: "",
    price: 0,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
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
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <br />
      <h3>{pizza.price} Руб.</h3>
    </div>
  );
};

export default FullPizas;
