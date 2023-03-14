import { Route, Routes } from "react-router-dom";
import "./scss/app.scss";
import { lazy, Suspense } from "react";

import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import SuspenseLoading from "./components/SuspenseLoading";

const Cart = lazy(() => import(/* webpachChunkName: "Cart" */ "./pages/Cart"));
const FullPizas = lazy(
  () => import(/* webpachChunkName: "FullPizas" */ "./pages/FullPizas")
);
const NotFound = lazy(
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
            <Suspense fallback={<SuspenseLoading value="Идет загрузка корзины..." />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<SuspenseLoading value="Идет загрузка ..." />}>
              <FullPizas />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<SuspenseLoading value="Пожалуйста подождите..." />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
