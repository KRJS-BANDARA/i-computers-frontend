import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';


export default function CreateOrder(props) {
const [isModelOpen, setIsModalOpen] = useState(false);
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [addressLine1, setAddressLine1] = useState("");
const [addressLine2, setAddressLine2] = useState("");
const [city, setCity] = useState("");
const [phone, setPhone] = useState("");
const navigate = useNavigate();
const cart = props.cart;


async function placeOrder() {
    try {
        const body = {
            firstName: firstName,
            lastName: lastName,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            phone: phone,
            items:[]
        };

        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            body.items.push({
                productId: item.product.productId,
                quantity: item.qty
            });
        }

        const token = localStorage.getItem("token");
        await api.post("/orders", body, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        toast.success("Order placed successfully!");    
        setIsModalOpen(false);
        navigate("/");


    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred while placing the order.");
    }
}

return (
    <>
    {isModelOpen && <div className="w-screen h-screen fixed top-0 left-0 bg-black/70 flex justify-center items-center z-50">
    <div className="w-[400px] bg-white rounded-lg flex flex-col justify-center items-center gap-4 p-4 relative">
        <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            X
        </button>
        <h2 className="text-2xl font-bold">Enter Your Details</h2>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" placeholder="Address Line 1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" placeholder="Address Line 2" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
        <button onClick={placeOrder} className="w-full p-2 text-white bg-accent rounded hover:bg-accent/80">
            Confirm Order
        </button>
    </div>
    </div>
    }

  <button onClick={() => setIsModalOpen(true)} className="w-[200px] p-2 rounded-sm bg-accent hover:bg-accent/90 text-white font-semibold">Order New</button>

</>
);
}