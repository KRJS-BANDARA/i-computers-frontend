import { FaPlug, FaPlus } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import AdminAddProductForm from "./adminAddProductForm";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../utils/api";
import LoadingScreen from "../../components/loadingScreen";
import { useNavigate } from "react-router-dom";
import ProductDeleteButton from "../../components/productDeleteButton";
import { CiEdit } from "react-icons/ci";
import ProductEditForm from "./adminEditProductForm";
import getFormattedPrice from "../../utils/price-formatter.js";

const sampleProducts = [];
export default function AdminProductPage() {
  const [products, setProducts] = useState(sampleProducts);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      const token = localStorage.getItem("token");
      api
        .get("/products", {
           headers: {
                "Authorization": `Bearer ${token}`
            } 
        })
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Failed to fetch products");
        });
    }
  }, [loading]);
  // Backend call products fetch and setProducts above

  return (
    <div className="w-full h-full">
      {/* {
                products.map(
                    (product, index) => {
                    return <div key={product.productId}>
                            <p>
                                {product.productId} - {product.name} - {product.price}
                            </p>
                            </div>
                
        }
             )   
        } */}

      <div className="w-full h-[100px] mb-10 bg-white shadow-2xl rounded-lg flex p-4 items-center justify-between">
        <h1 className="font-semibold text-2xl">All Product</h1>
        <div className="h-full gap-4 flex items-center">
          {products.length} Products
        </div>
      </div>
      {loading && <LoadingScreen />}

      <table className="w-full text-center rounded-lg overflow-hidden ">
        <thead className="bg-accent text-white h-[40px]">
          <tr>
            <th className="w-[5%]">-</th>
            <th className="w-[7%]">Product Id</th>
            <th className="w-[22%]">Name</th>
            <th className="w-[9%]">Price</th>
            <th className="w-[9%]">Labelled Price</th>
            <th className="w-[7%]">Brand</th>
            <th className="w-[7%]">Model</th>
            <th className="w-[9%]">Category</th>
            <th className="w-[5%]">Availability</th>
            <th className="w-[5%]">Stock</th>
            <th className="w-[15%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr
                className="odd:bg-gray-100 even:bg-white h-60px"
                key={product.productId}
              >
                <td>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{product.productId}</td>
                <td>{product.name}</td>
                <td>{getFormattedPrice(product.price)}</td>
                <td>{getFormattedPrice(product.labelledPrice)}</td>
                <td>{product.brand}</td>
                <td>{product.model}</td>
                <td>{product.category}</td>
                <td>{product.availability ? "Available" : "Unavailable"}</td>
                <td>{product.stock}</td>
                <td>
                  <div className="w-full flex justify-center items-center gap-4">
                  <Link to="/admin/edit-product" state={product}>
                    <CiEdit className="text-blue-600 text-xl rounded-full hover:border cursor-pointer" />
                  </Link>
                  <ProductDeleteButton
                    productId={product.productId}
                    refresh={() => {
                      setLoading(true);
                    }}
                  />
                  </div> 
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Link
        to="/admin/add-product"
        className="w-[80px] h-[80px] bg-accent
             text-white rounded-full text-white text-4xl flex justify-center items-center 
             fixed bottom-4 right-4 shadow-2xl hover:bg-white hover:text-accent"
      >
        <FaPlus />
      </Link>
    </div>
  );
}