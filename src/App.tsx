import { Route, Routes } from "react-router-dom";
import "./scss/app.scss";
import React from "react";
import Home from "./pages/Home";
// import NotFound from "./pages/NotFound";

import MainLayout from "./layouts/MainLayout";

const Cart = React.lazy(() => import(/* webpachChunkName: "Cart" */ "./pages/Cart"));
const FullPizas = React.lazy(
  () => import(/* webpachChunkName: "FullPizas" */ "./pages/FullPizas")
);
const NotFound = React.lazy(
  () => import(/* webpachChunkName: "NotFound" */ "./pages/NotFound")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <React.Suspense
              fallback={<h2 className="container">Идет загрузка корзины... </h2>}
            >
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <React.Suspense fallback={<h2 className="container">Идет загрузка... </h2>}>
              <FullPizas />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense
              fallback={<h2 className="container">Пожалуйста подождите.. </h2>}
            >
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
//526 Kb - bundle;
