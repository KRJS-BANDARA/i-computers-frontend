import { useEffect, useState } from "react";
import api from "../utils/api";
import LoadingScreen from "../components/loadingScreen";
import ProductCard from "../components/procuctCard";
import toast from "react-hot-toast";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (loading) {
      api
        .get("/products")
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Failed to fetch products.");
        });
    }
  }, [loading]);

  function searchProducts() {
    setSearching(true);
    api
      .get("/products/search/" + query)
      .then((response) => {
        setProducts(response.data);
        setSearching(false);
    
      })
      .catch((error) => {
        toast.error("Failed to fetch products.");
        setSearching(false);
      });
  }

  return (
    <div className="w-full h-full flex justify-center items-center gap-6 flex-wrap p-20">
      {loading && <LoadingScreen />}
      {searching && <LoadingScreen />}
      <div className="w-full h-[70px] flex justify-center items-center gap-4">
        <input
          type="text"
          placeholder="Search for products"
          onChange={(e) => setQuery(e.target.value)}
          className="w-[400px] h-[40px] border-2 border-gray-300 rounded-md px-4"
        />
        {searching ? "searching..." : "search"}
        <button
          onClick={searchProducts}
          disabled={searching} className="w-[120px] h-[40px] bg-black text-white rounded-md"
        >
          Search
        </button>

        <button
          onClick={() => {
            setQuery("");
            setLoading(true);
          }}
          className="w-[120px] h-[40px] bg-black text-white rounded-md"
        >
          All Products
        </button>

      </div>
      {!loading && (
        <>
          {products.map((product) => {
            return <ProductCard key={product._Id} product={product} />;
          })}
        </>
      )}
    </div>
  );
}
