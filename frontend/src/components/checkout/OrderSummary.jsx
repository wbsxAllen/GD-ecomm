import React from 'react'

const OrderSummary = ({ cart, address, paymentMethod }) => {
  const totalPrice = cart?.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0) || 0;

  return (
    <div className="container mx-auto px-4 mb-8">
     <div className="flex flex-wrap">
      <div className="w-full lg:w-8/12 pr-4">
       <div className="space-y-4">
        <div className="p-4 border rounded-lg shadow-sm">
            <h2 className='text-2xl font-semibold mb-2'>Billing Address</h2>
              <p><strong>Receiver:</strong> {address?.receiverName}</p>
              <p><strong>Phone:</strong> {address?.phone}</p>
              <p><strong>Address:</strong> {[address?.detail, address?.city, address?.province, address?.zipCode, address?.country].filter(Boolean).join(', ')}</p>
        </div>
        <div className='p-4 border rounded-lg shadow-sm'>
              <h2 className='text-2xl font-semibold mb-2'>Payment Method</h2>
              <p><strong>Method:</strong> {paymentMethod}</p>
        </div>
        <div className='pb-4 border rounded-lg shadow-sm mb-6'>
            <h2 className='text-2xl font-semibold mb-2'>Order Items</h2>
            <div className='space-y-2'>
                {cart?.map((item) => (
                    <div key={item?.productId} className='flex items-center'>
                    <img
                      src={item?.imageUrl ? item.imageUrl : '/default.png'}
                      alt={item?.productName}
                      className="w-12 h-12 rounded"
                    />
                    <div className='text-gray-500 ml-2'>
                        <p>{item?.productName}</p>
                        <p>
                        {item?.quantity} x ${Number(item?.price).toFixed(2)} = {(Number(item?.quantity) * Number(item?.price)).toFixed(2)}
                        </p>
                    </div>
                    </div>
                ))}
            </div>
        </div>
       </div>
      </div>
      <div className="w-full lg:w-4/12 mt-4 lg:mt-0">
          <div className="border rounded-lg shadow-sm p-4 space-y-4">
            <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Products</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (0%)</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>SubTotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default OrderSummary