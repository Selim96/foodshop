import React, {lazy, Suspense} from 'react';
import { Route, Routes } from "react-router-dom";
import Loader from './components/Loader';
import Header from './components/Header';
const ShopPage = lazy(() => import("./Pages/ShopPage"));

const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<ShopPage/>} />
          
          
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
