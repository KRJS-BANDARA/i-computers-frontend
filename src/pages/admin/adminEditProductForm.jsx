import { use, useState } from "react";
import { PiGraphicsCard } from "react-icons/pi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import { useLocation } from "react-router-dom";


export default function AdminEditProductForm() {
  const location = useLocation();
  const [productId, setProductId] = useState(location.state.productId);
  const [name, setName] = useState(location.state.name);
  const [altNames, setAltNames] = useState(location.state.altNames.join(","));
  const [description, setDescription] = useState(location.state.description);
  const [price, setPrice] = useState(location.state.price);
  const [labeledPrice, setLabeledPrice] = useState(location.state.labelledPrice);
  const [images, setImages] = useState([]);
  const [isAvailable, setIsAvailable] = useState(location.state.isAvailable);
  const [category, setCategory] = useState(location.state.category);
  const [stock, setStock] = useState(location.state.stock);
  const [brand, setBrand] = useState(location.state.brand);
  const [model, setModel] = useState(location.state.model);
  const [isUploading, setIsUploading] = useState(false);
  const navigation = useNavigate();

  console.log(location);

  async function editProduct() {
    setIsUploading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found. Please log in.");
      navigation("/login");
      return;
    }

    

    try {
    const imageUploadPromises = [];
    for (let i = 0; i < images.length; i++) {
      imageUploadPromises.push(mediaUpload(images[i]));
    }

      let imageUrls = await Promise.all(imageUploadPromises);
      if (imageUrls.length === 0) {
        imageUrls = location.state.images;
      }

      const allNamesArray = altNames.split(",");

      const requestBody = {
        name: name,
        altNames: allNamesArray,
        description: description,
        price: price,
        labeledPrice: labeledPrice,
        images: imageUrls,
        isAvailable: isAvailable,
        category: category,
        stock: stock,
        brand: brand,
        model: model,
      };
      await api.put("/products/" + productId, requestBody, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("Product updated successfully!");
      navigation("/admin/products");
      setIsUploading(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Error uploading images or editing product",
      );
      setIsUploading(false);
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full h-[100px] bg-white shadow-2xl rounded-lg flex p-4 items-center justify-between">
        <h1 className="font-semibold text-2xl">Edit Product</h1>
        <div className="h-full gap-4 flex items-center">
          <Link
            to="/admin/products"
            className="bg-red-600 py-2 w-[100px] text-center text-white rounded-lg"
          >
            Cancel
          </Link>
          <button
            disabled={isUploading}
            onClick={editProduct}
            className="bg-green-600 w-[100px] text-white text-center py-2 rounded-lg cursor-pointer"
          >
            {isUploading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
      <div className="w-full flex flex-wrap ">
        <div className="w-1/4 h-[90px] flex flex-col px-2 my-2">
          <label className="font-semibold text-lg">Product Id</label>
          <input
            disabled value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full h-[40px] 
            rounded-lg border-2 border-gray-300 px-2"
            placeholder="PD-0001"
          />
        </div>

        <div className="w-1/4 h-[90px] flex flex-col px-2 my-2">
          <label className="font-semibold text-lg">Product Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[40px] 
            rounded-lg border-2 border-gray-300 px-2"
            placeholder="Enter Product Name"
          />
        </div>

        <div className="w-1/2 h-[90px] flex flex-col pxx-2 my-2">
          <label className="font-semibold text-lg">
            Alternative Names{" "}
            <span className="italic text-sm text-gray-400">
              {" "}
              (Comma separated)
            </span>
          </label>
          <input
            value={altNames}
            onChange={(e) => setAltNames(e.target.value)}
            className="w-full h-[40px] 
            rounded-lg border-2 border-gray-300 px-2"
            placeholder="VGA, Graphics Card, GPU"
          />
        </div>

        <div className="w-1/4 h-[90px] flex flex-col px-2 my-2">
          <label className="font-semibold text-lg">Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full h-[40px] 
            rounded-lg border-2 border-gray-300 px-2"
            placeholder="0.00"
          />
        </div>

        <div className="w-1/4 h-[90px] flex flex-col px-2 my-2">
          <label className="font-semibold text-lg">Labeled Price</label>
          <input
            value={labeledPrice}
            onChange={(e) => setLabeledPrice(e.target.value)}
            className="w-full h-[40px] 
            rounded-lg border-2 border-gray-300 px-2"
            placeholder="0.00"
          />
        </div>

        <div className="w-full h-[170px] flex flex-col px-2 my-2">
          <label className="font-semibold text-lg">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-full 
            rounded-lg border-2 border-gray-300 px-2"
            placeholder="Enter product description"
          />
        </div>

        <div className="w-1/4 h-[90px] flex flex-col px-2 my-2">
          <label className="font-semibold text-lg">Images</label>
          <input
            multiple={true}
            type="file"
            onChange={(e) => setImages(e.target.files)}
            className="w-full h-[40px] 
            rounded-lg border-2 border-gray-300 px-2"
          />
        </div>

        <div className="w-1/4 h-[90px] flex flex-col px-2 my-2">
          <label className="font-semibold text-lg">Availability</label>
          <select
            value={isAvailable}
            onChange={(e) => setIsAvailable(e.target.value)}
            className="w-full h-[40px] 
            rounded-lg border-2 border-gray-300 px-2"
          >
            <option value={true}>Available</option>
            <option value={false}>Unavailable</option>
          </select>
        </div>

        <div className="w-1/4 h-[90px] flex flex-col px-2 my-2">
          <label className="font-semibold text-lg">Stock</label>
          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full h-[40px] 
            rounded-lg border-2 border-gray-300 px-2"
            placeholder="0"
          />
        </div>

        <div className="w-1/4 h-[90px] flex flex-col px-2 my-2"></div>

        <div className="w-1/4 h-[90px] flex flex-col px-2 my-2">
          <label className="font-semibold text-lg">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-[40px] 
            rounded-lg border-2 border-gray-300 px-2"
          >
            <option value="graphicsCard">Graphics Card</option>
            <option value="motherBoard">Mother Board</option>
            <option value="processor">Processor</option>
            <option value="ram">RAM</option>
            <option value="storage">Storage</option>
            <option value="powerSupply">Power Supply</option>
            <option value="monitor">Monitor</option>
            <option value="keyboard">Keyboard</option>
            <option value="mouse">Mouse</option>
            <option value="speaker">Speaker</option>
            <option value="headphones">Headphones</option>
          </select>
        </div>

        <div className="w-1/4 h-[90px] flex flex-col px-2 my-2">
          <label className="font-semibold text-lg">
            Brand{" "}
            <span className="italic text-sm text-gray-400"> (Optional)</span>
          </label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full h-[40px] 
            rounded-lg border-2 border-gray-300 px-2"
          >
            <option value="nvidia">NVIDIA</option>
            <option value="amd">AMD</option>
            <option value="asus">ASUS</option>
            <option value="msi">MSI</option>
            <option value="gigabyte">Gigabyte</option>
            <option value="evga">EVGA</option>
            <option value="zotac">ZOTAC</option>
            <option value="pny">PNY</option>
            <option value="xfx">XFX</option>
            <option value="sapphire">Sapphire</option>
            <option value="">No Brand</option>
          </select>
        </div>

        <div className="w-1/4 h-[90px] flex flex-col px-2 my-2">
          <label className="font-semibold text-lg">
            Model{" "}
            <span className="italic text-sm text-gray-400"> (Optional)</span>
          </label>
          <input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full h-[40px] 
            rounded-lg border-2 border-gray-300 px-2"
            placeholder="RTX 3080"
          />
        </div>
      </div>
    </div>
  );
}
