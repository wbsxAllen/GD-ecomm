import { useEffect, useMemo, useCallback } from 'react';
import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "../shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Filter from "./Filter";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";

const Products = () => {
    const { isLoading, errorMessage } = useSelector((state) => state.errors);
    const { products, pagination } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useProductFilter();

    // Memoize whether we have products to avoid recalculating on every render
    const hasProducts = useMemo(() => {
        return products && products.length > 0;
    }, [products]);

    // Memoize the product list rendering
    const productList = useMemo(() => {
        if (!hasProducts) {
            return <div className="col-span-full text-center text-gray-500">No products found.</div>;
        }

        return products.map((item, i) => (
            <ProductCard key={item.id || i} {...item} />
        ));
    }, [products, hasProducts]);

    if (isLoading) return <Loader />;
    if (errorMessage) return <div className="text-center text-red-500 py-10">{errorMessage}</div>;

    return (
        <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
            <Filter />
            <div className="min-h-[700px]">
                <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                    {productList}
                </div>
                <div className="flex justify-center pt-10">
                    <Paginations
                        numberOfPage={pagination?.totalPages}
                        totalProducts={pagination?.totalElements}/>
                </div>
            </div>
        </div>
    )
}

export default Products;