import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart,setCart] = useState([]);

    useEffect(()=>{
        let existingItem = localStorage.getItem('cart_info')
        if(existingItem) setCart(JSON.parse(existingItem));
    },[])

    return (
        <CartContext.Provider value = {[cart,setCart]}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => useContext(CartContext);
export {useCart, CartProvider};