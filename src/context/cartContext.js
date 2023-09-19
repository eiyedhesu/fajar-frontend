import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem('cart')
    if (existingCartItem) setCart(JSON.parse(existingCartItem))
  }, [])

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }


  return (
    <CartContext.Provider value={[cart, updateCart]}>
      {children}
    </CartContext.Provider>
  );
};


const useCart = () => useContext(CartContext);

export { useCart, CartProvider };