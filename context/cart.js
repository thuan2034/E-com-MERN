import { createContext, useState, useContext, useEffect, useRef } from "react";
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  // Load cart items from local storage on component mount
  const initialRender = useRef(true);
 
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cartItems"))) {
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
      setCartItems([...cartItems, ...storedCartItems]);
    }
  }, []);
 
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const addToCart = (product, quantity) => {
    const existingProduct = cartItems.find((item) => item._id === product._id);
    if (existingProduct) {
      const updatedCartItems = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };
  const updateQuantity = (product, quantity) => {
    const updatedItems = cartItems.map((item) =>
      item._id === product._id ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };
  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCartItems);
    // Update local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    }
  };
  // Provide cart items and functions to the rest of the app
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
