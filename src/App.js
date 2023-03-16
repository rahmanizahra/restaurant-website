// import React, { useState } from "react";
// import Header from "./Components/Layout/Header";
// import Cart from "./Components/Cart/Cart";
// import Meals from "./Components/Meals/Meals";
// import CartProvider from "./store/CartProvider";
// import react from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LogInPage from "./pages/LogInPage";
import Users from "./pages/Users";

function App() {
  // const [cartIsShown, setCartIsShown] = useState(false);

  // function showCartHandler() {
  //     setCartIsShown(true);
  // }

  // function hideCartHandler() {
  //     setCartIsShown(false);
  // }

  /* // <CartProvider>
              //   {cartIsShown && <Cart onClose={hideCartHandler} />}
              //   <Header onShowCart={showCartHandler} />
              //   <main>
              //     <Meals />
              //   </main>
              // </CartProvider> */

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        {" "}
      </Route>{" "}
      <Route path="/login" element={<LogInPage />}>
        {" "}
      </Route>{" "}
      <Route path="/user" element={<Users />} />
    </Routes>
  );
}

export default App;
