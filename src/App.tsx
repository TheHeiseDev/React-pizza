import { Route, Routes } from "react-router-dom";
import "./scss/app.scss";
import React from "react";

import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Suspense from "./components/Suspense";

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
            <React.Suspense fallback={<Suspense value="Идет загрузка корзины..." />}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <React.Suspense fallback={<Suspense value="Идет загрузка ..." />}>
              <FullPizas />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<Suspense value="Пожалуйста подождите..." />}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
