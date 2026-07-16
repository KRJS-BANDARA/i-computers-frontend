import { CiTrash } from "react-icons/ci";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import api from "../utils/api";
import { toast } from "react-hot-toast";

export default function ProductDeleteButton(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const refresh = props.refresh;
  const productId = props.productId;
  return (
    <>
      <CiTrash
        className="text-red-600 text-xl rounded-full hover:border cursor-pointer"
        onClick={() => setIsModalVisible(true)}
      />
      {isModalVisible && (
        <div className="w-screen h-screen bg-black/70 fixed top-0 left-0 z-50 flex items-center justify-center">
          <div className="w-[400px] h-[200px] bg-white rounded-lg flex flex-col overflow-hidden justify-between">
            <div className="w-full h-40px bg-accent flex justify-between items-center px-4">
              <h1 className="text-white text-lg font-semibold ">
                Confirm Deletion
              </h1>
              <IoClose
                className="text-white hover:bg-red-600 cursor-pointer"
                onClick={() => setIsModalVisible(false)}
              />
            </div>
            <p className="text-center p-4 text-gray-700">
              Are you sure you want to delete this product with ID: {productId}
            </p>
            <div className="w-full h-40px p-2 flex justify-center items-center gap-4">
              <button
                className="w-[100px] bg-red-600 hover:bg-red-700 text-secondary p-2 rounded-sm"
                onClick={() => {
                  // Call API to delete product
                  const token = localStorage.getItem("token");
                  api
                    .delete("/products/" + productId, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    })
                    .then((response) => {
                      toast.success("Product deleted successfully");
                      refresh();
                      setIsModalVisible(false);
                    })
                    .catch((error) => {
                      toast.error("Failed to delete product");
                      setIsModalVisible(false);
                    });
                }}
              >
                Delete
              </button>

              <button
                className="w-[100px] bg-blue-600 hover:bg-blue-700 text-secondary p-2 rounded-sm"
                onClick={() => setIsModalVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
