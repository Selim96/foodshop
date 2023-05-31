import React, {lazy, Suspense,useEffect} from 'react';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import ShopAPI from './services/api';
import Loader from './components/Loader';
import Header from './components/Header';
const ShopPage = lazy(() => import("./Pages/ShopPage"));
const ShoppingCard = lazy(() => import("./Pages/ShoppingCard"));
const HistoryPage = lazy(() => import("./Pages/HistoryPage"));

const shopApi = new ShopAPI();

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
            dispatch(shopApi.allRestaurants());
  }, [dispatch]);
  
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<ShopPage/>} />
          <Route path='/card' element={<ShoppingCard/>} />
          <Route path='/history' element={<HistoryPage/>} />
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
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
