import React, {lazy, Suspense} from 'react';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
