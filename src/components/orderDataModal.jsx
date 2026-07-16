import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import getFormattedPrice from "../utils/price-formatter.js";
import api from "../utils/api.js";
import { toast } from "react-hot-toast";

export default function OrderDataModal(props) {
const [isOpen, setIsOpen] = useState(false);
const order = props.order;
const refresh = props.refresh;
//console.log(refresh);

function UpdateOrderStatus(newStatus) {
    const token = localStorage.getItem("token");
    api.put("/orders/" + order.orderId, {
        status: newStatus
    }, {
        headers: {        
            "Authorization": `Bearer ${token}`
        }
    }).then((response) => {
        toast.success("Order status updated successfully!");
        refresh();

    }).catch((error) => {
        toast.error("Failed to update order status");
    });
}

  return (
    <>
    <IoMdEye className="text-xl text-blue-600 cursor-pointer rounded-full hover:border" onClick={() => setIsOpen(true)} />
    {
        isOpen && <div className="w-screen h-screen fixed left-0 top-0 bg-black/70 flex justify-center items-center z-50">
            <div className="w-[700px] max-h-screen bg-primary rounded-xl p-4 flex flex-col">
                <div className="w-full h-[250px] relative bg-white">
                {/*orderId,firstName,lastName,email,phone,addressLine1,addressLine2,city,status */}
                {/*close button*/}
                <button className="absolute top-2 right-2 text-xl" onClick={() => setIsOpen(false)}>
                    &times;
                </button>
                <div className="w-full h-full p-4 flex flex-col items-center gap-2">
                    <h2 className="text-2xl font-bold">Order ID: {order.orderId}</h2>
                    <p className="text-lg font-semibold">Name: {order.firstName} {order.lastName}</p>
                    <p className="text-lg font-semibold">Email: {order.email}</p>
                    <p className="text-lg font-semibold">Phone: {order.phone}</p>
                    <p className="text-lg font-semibold">Address: {order.addressLine1}, {order.addressLine2}, {order.city}</p>
                    <p className="text-lg font-semibold">Status: {order.status}</p>

                    {props.isAdmin && <select className="w-[200px] ml-4 border" defaultValue={order.status} onChange={(e) => {
                        UpdateOrderStatus(e.target.value);
                    }}>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                    </select>}
                </div>
                </div>
                <div className="w-full h-[400px] p-4 flex flex-col gap-4 overflow-y-scroll">
                    {
                        order.items.map((item, index) => {
                            return (
                                <div key={index} className="w-[600px] h-[200px] bg-white my-4 shadow-2xl flex flex-row relative">
                            <img src={item.product.images} className="w-full aspect-auto"/>

                           <div className="w-full h-[450px] flex flex-col p-4">
                            <h1 className="text-lg font-bold">{item.product.name}</h1>
                            <p className="text-sm text-gray-500 line-through">{getFormattedPrice(item.product.price)}</p>
                            <p className="text-lg font-semibold text-accent">{getFormattedPrice(item.product.price)}</p>
                            <div className="w-[100px] h-[30px] mt-2 border border-accent rounded-4xl flex flex-row justify-center items-center overflow-hidden">
                               
                                <span className="w-[40px] h-full flex justify-center items-center">
                                    {item.qty}
                                </span>
                                
                            </div>

                        </div> 
                       
                        <span className="absolute bottom-2 right-2 text-xl font-semibold text-accent">
                            {getFormattedPrice(item.product.price * item.qty)}
                        </span>
                        </div>
                            )
                        })
                    }

                </div>

            </div>
        </div>
    }
    </>
  );
}