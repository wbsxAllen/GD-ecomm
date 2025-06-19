import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";

const ProductCard = ({ id, name, description, price, stock, imageUrl, scale, grade, series }) => {
    const isOutOfStock = Number(stock) <= 0;
    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const btnLoader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const dispatch = useDispatch();

    const handleProductView = (product) => {
        setSelectedViewProduct(product);
        setOpenProductViewModal(true);
    };

    const addToCartHandler = (cartItems, e) => {
        e.stopPropagation();
        dispatch(addToCart(cartItems, 1, toast));
    };

    return (
        <div
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
            onClick={() => handleProductView({ id, name, description, price, stock, imageUrl, scale, grade, series })}
        >
            <img src={imageUrl} alt={name} className="w-40 h-40 object-contain mb-4" />
            <div className="font-bold text-lg mb-1">{name}</div>
            <div className="text-gray-600 text-sm mb-2 line-clamp-2">{description}</div>
            <div className="text-blue-600 font-bold text-xl mb-2">${price}</div>
            <div className="text-xs text-gray-400 mb-1">Scale: {scale} | Grade: {grade}</div>
            <div className="text-xs text-gray-400 mb-2">Series: {series}</div>
            <button
                className={`mt-auto px-4 py-2 rounded ${isOutOfStock ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                disabled={isOutOfStock}
                onClick={e => addToCartHandler({
                    image: imageUrl,
                    productName: name,
                    description,
                    price,
                    productId: id,
                    quantity: stock,
                }, e)}
            >
                {isOutOfStock ? "Stock Out" : "Add to Cart"}
            </button>
            <ProductViewModal 
                open={openProductViewModal}
                setOpen={setOpenProductViewModal}
                product={selectedViewProduct}
                isAvailable={!isOutOfStock}
            />
        </div>
    );
};

export default ProductCard;