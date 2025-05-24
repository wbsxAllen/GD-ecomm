const ProductCard = () => {
  return (
    <div className="border rounded p-4 flex flex-col items-center justify-center min-h-[200px] bg-white shadow">
      <div className="w-24 h-24 bg-gray-200 rounded mb-2" />
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-1" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
};

export default ProductCard; 