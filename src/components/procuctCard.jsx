import getFormattedPrice from '../utils/price-formatter.js';
import { Link } from 'react-router-dom';

function ProductCard(props) {
const product = props.product;

    return (
        <Link to={"/overview/"+product.productId} className="bg-white w-72 h-96 p-4 rounded-lg shadow-xl flex flex-col">
            <img src={product.imgUrl} className="w-full h-[60%] object-cover"/>
            <div className="w-full h-[40%] flex flex-col justify-between p-2">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            {
                product.price < product.labeledPrice && <p className="text-sm line-through text-gray-500">{getFormattedPrice(product.labeledPrice)}</p>
            }
            <p className="text-lg font-semibold text-accent">{getFormattedPrice(product.price)}</p>
            </div>
        </Link>  
    );
}
export default ProductCard;