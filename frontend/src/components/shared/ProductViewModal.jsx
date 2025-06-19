import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import Status from './Status';
import { MdClose, MdDone } from 'react-icons/md';
import ProductReview from '../products/ProductReview';

function ProductViewModal({open, setOpen, product, isAvailable}) {
  const {id, name, imageUrl, description, stock, price, scale, grade, series} = product;

  return (
    <>
      <Dialog open={open} as="div" className="relative z-10" onClose={() => setOpen(false)}>
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all md:max-w-[620px] md:min-w-[620px] w-full">
              {imageUrl && (
                <div className='flex justify-center aspect-[3/2]'>
                  <img 
                    src={imageUrl}
                    alt={name}
                    className="object-contain w-full h-full" 
                  />
                </div>
              )}

              <div className='px-6 pt-10 pb-2'>
                <DialogTitle as="h1" className="lg:text-3xl sm:text-2xl text-xl font-semibold leading-6 text-gray-800 mb-4">
                  {name}
                </DialogTitle>

                <div className="space-y-2 text-gray-700 pb-4">
                  <span className="text-xl font-bold">
                    ${Number(price).toFixed(2)}
                  </span>

                  <div className="flex flex-col gap-2">
                    <div className="text-sm text-gray-600">
                      Scale: {scale} | Grade: {grade}
                    </div>
                    <div className="text-sm text-gray-600">
                      Series: {series}
                    </div>
                  </div>

                  {isAvailable ? (
                    <Status
                      text="In Stock"
                      icon={MdDone}
                      bg="bg-teal-200"
                      color="text-teal-900"
                    />
                  ) : (
                    <Status
                      text="Out-Of-Stock"
                      icon={MdClose}
                      bg="bg-rose-200"
                      color="text-rose-700"
                    />
                  )}
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                <div className="text-gray-700">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p>{description}</p>
                </div>
              </div>

              {/* Product Review */}
              {id && <div className='px-6 pb-2'><ProductReview productId={id} /></div>}

              <div className="px-6 py-4 flex justify-end gap-4">
                <button
                  onClick={() => setOpen(false)}
                  type="button"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-700 hover:text-slate-800 hover:border-slate-800 rounded-md"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default ProductViewModal;