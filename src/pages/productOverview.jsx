import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen.jsx";
import ProductImageSlideShow from "../components/productImageSlideShow.jsx";
import getFormattedPrice from "../utils/price-formatter.js";
import { getCart, addToCart } from "../utils/cart.js";
import { Link } from "react-router-dom";

export default function ProductOverview() {
  const parameters = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!parameters.productId) {
      navigate("/products");
    }
    api
      .get("/products/" + parameters.productId)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch product.");
        navigate("/products");
      });
  }, []);

  return (
    <div className="w-full h-auto lg:h-full pt-10 lg:pt-0 flex flex-col lg:flex-row justify-center items-center">
      {!product && <LoadingScreen />}
      {product && 
        <>
          <div className="w-full lg:w-1/2 h-full flex justify-center items-center">
            <ProductImageSlideShow images={product.images} />
          </div>

          <div className="w-fill lg:w-1/2 h-full flex flex-col p-6">
            <span className="text-sm text-gray-500 italic mb-4">
              {product.productId}
            </span>
            <p className="text-lg text-gray-500 mb-4">
              {product.brand + " " + product.model}
            </p>
            <h1 className="text-3xl font-semibold mb-6">
              {product.name}
              {product.altNames.map((altName, index) => {
                return (
                  <span key={index} className="text-gray-500">
                    {" "}
                    {" | " + altName}
                  </span>
                );
              })}
            </h1>
            {product.price < product.labeledPrice && (
              <p className="text-lg line-through text-gray-500 mb-2">
                {getFormattedPrice(product.labeledPrice)}
              </p>
            )}
            <p className="text-xl font-semibold text-accent">
              {getFormattedPrice(product.price)}
            </p>
            <p className="text-md mt-4">{product.description}</p>
            <div className="flex">
              <button
                className="w-[220px] bg-accent text-white px-4 py-2 rounded-lg mt-6 hover:bg-accent transition"
                onClick={() => {
                  addToCart(product, 1);
                  toast.success("Product added to cart.");
                }}
              >
                Add to Cart
              </button>
              <Link
                className="w-[220px] bg-gray-500 text-white px-4 py-2 rounded-lg mt-6 ml-4 text-center hover:bg-gray-600 transition"
                to="/checkout"
                state={[
                  {
                    product: {
                      productId: product.productId,
                      name: product.name,
                      images: product.images[0],
                      price: product.price,
                      labeledPrice: product.labeledPrice,
                    },
                    qty: 1,
                  },
                ]}
              >
                Buy Now
              </Link>
            </div>
          </div>
        </>
      }
    </div>
  );
}
