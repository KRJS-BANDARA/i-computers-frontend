import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import LoadingScreen from "../components/loadingScreen";
import getFormattedPrice from "../utils/price-formatter.js";
import formatTimestamp from "../utils/date-formatter.js";
import OrderDataModal from "../components/orderDataModal.jsx";   

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (loading) {
      const token = localStorage.getItem("token");
      api
        .get("/orders/"+pageNumber+"/"+pageSize, {
           headers: {
                "Authorization": `Bearer ${token}`
            } 
        })
        .then((response) => {
          setOrders(response.data.orders);
          setTotalOrders(response.data.totalOrders);
          setTotalPages(response.data.totalPages);
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Failed to fetch orders");
        });
    }
  }, [loading]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full h-[100px] mb-10 bg-white shadow-2xl rounded-lg flex p-4 items-center justify-between">
        <h1 className="font-semibold text-2xl">My Orders</h1>
        <div className="h-full gap-4 flex items-center">
          {totalOrders} Orders
        </div>
      </div>
      {loading && <LoadingScreen />}

      <table className="w-full text-center rounded-lg overflow-hidden ">
        <thead className="bg-accent text-white h-[40px]">
          <tr>
            <th className="w-[5%]">Order ID</th>
            <th className="w-[7%]">Email</th>
            <th className="w-[22%]">Name</th>
            <th className="w-[9%]">City</th>
            <th className="w-[9%]">Phone</th>
            <th className="w-[7%]">Status</th>
            <th className="w-[7%]">Date</th>
            <th className="w-[9%]">Total Amount</th>
            <th className="w-[15%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            return (
              <tr
                className="odd:bg-gray-100 even:bg-white h-60px"
                key={order.orderId}
              >
                <td>
                 {order.orderId}
                </td>
                <td>{order.email}</td>
                <td>{order.firstName} {order.lastName}</td>
                <td>{order.city}</td>
                <td>{order.phone}</td>
                <td>{order.status}</td>
                <td>{formatTimestamp(order.date)}</td>
                <td>{getFormattedPrice(order.totalAmount)}</td>
                <td>
                  <div className="w-full flex justify-center items-center gap-4">
                    <OrderDataModal isAdmin={false} order={order} refresh={()=>setLoading(true)}/>
                  </div> 
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
        <div className="p-2 fixed bottom-4 bg-white shadow-2xl flex items-center justify-center">
          <select value={pageSize} onChange={(e) => {setPageSize(Number(e.target.value));setLoading(true);}} className="h-full px-3 border-r">
            <option value="2">2 per page</option>
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
          </select>
          <div className="h-full flex items-center justify-center gap-4">
            <button disabled={pageNumber === 1} onClick={() => {setPageNumber(pageNumber-1);setLoading(true);}} className="h-full px-3 border-r disabled:text-gray-400">Previous</button>
            <span>Page {pageNumber} of {totalPages}</span>
            <button disabled={pageNumber === totalPages} onClick={() => {setPageNumber(pageNumber+1);setLoading(true);}} className="h-full px-3 border-l disabled:text-gray-400">Next</button>
          </div>
        </div>   
    </div>
  );
}