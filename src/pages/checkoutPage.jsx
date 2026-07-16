import { useState } from "react";
import { getCartTotal } from "../utils/cart.js";
import getFormattedPrice from "../utils/price-formatter.js";
import { useLocation } from "react-router-dom";
import CreateOrder from "../components/createOrder.jsx";


export default function CheckoutPage() {
    const location = useLocation();
    const data = location.state;
    const [cart, setCart] = useState(data);
    
    return (
        <div className="w-full h-full overflow-y-scroll flex items-center flex-col">
            {
                cart.map((cartItem, index) => {

                    return (
                        <div key={index} className="w-[400px] lg:w-[600px] h-[150px] bg-white my-4 shadow-2xl flex flex-row relative">
                            <img src={cartItem.product.images} className="w-full aspect-auto"/>

                           <div className="w-full h-[450px] flex flex-col p-4">
                            <h1 className="text-lg font-bold">{cartItem.product.name}</h1>
                            <p className="text-sm text-gray-500 line-through">{getFormattedPrice(cartItem.product.price)}</p>
                            <p className="text-lg font-semibold text-accent">{getFormattedPrice(cartItem.product.price)}</p>
                            <div className="w-[100px] h-[30px] mt-2 border border-accent rounded-4xl flex flex-row justify-center items-center overflow-hidden">
                                <button className="w-[30px] h-full hover:bg-accent hover:text-white" 
                                    onClick={() => {
                                      const newCart = [...cart];   //if a json {...cart}
                                      newCart[index].qty = newCart[index].qty - 1;
                                      if (newCart[index].qty > 0) {
                                          setCart(newCart);
                                      } 
                                    }}>
                                    -
                                </button>
                                <span className="w-[40px] h-full flex justify-center items-center">
                                    {cartItem.qty}
                                </span>
                                <button className="w-[30px] h-full hover:bg-accent hover:text-white"
                                onClick={() => {
                                    const newCart = [...cart];   //if a json {...cart}
                                    newCart[index].qty = newCart[index].qty + 1;
                                    setCart(newCart);
                                }}>
                                    +
                                </button>
                            </div>

                        </div> 
                       
                        <span className="absolute bottom-2 right-2 text-xl font-semibold text-accent">
                            {getFormattedPrice(cartItem.product.price * cartItem.qty)}
                        </span>
                        </div>
                    );
                })
            }
        <div className="w-[600px] h-[100px] shadow-2xl sticky bottom-0 my-4 bg-white flex justify-between items-center p-4">
            <CreateOrder cart={cart}/>
            <div className="h-full flex justify-end items-center">
            <span className="text-gray-500 text-lg mr-4">Total:</span>
            <span className="lg:text-2xl font-semibold text-accent font-bold">
            {getFormattedPrice(getCartTotal(cart))}
            </span>
            </div>
        </div>
            
        </div>
    );
}