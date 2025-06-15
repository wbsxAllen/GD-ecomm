import React from 'react'
import { FaCheckCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { selectUserCheckoutAddress } from '../../store/actions';

const AddressList = ({ addresses, setSelectedAddress, setOpenAddressModal, setOpenDeleteModal }) => {
    const dispatch = useDispatch();
    const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

    const onEditButtonHandler = (address) => {
        setSelectedAddress(address);
        setOpenAddressModal(true);
    };

    const onDeleteButtonHandler = (address) => {
        setSelectedAddress(address);
        setOpenDeleteModal(true);
    };

    const handleAddressSelection = (address) => {
        dispatch(selectUserCheckoutAddress(address));
    };

  return (
    <div className='space-y-4'>
        {addresses.map((address) => (
            <div
                    key={address.id || address.addressId}
                onClick={() => handleAddressSelection(address)}
                    className={`p-4 border rounded-md cursor-pointer relative transition-all ${
                        (selectedUserCheckoutAddress?.id || selectedUserCheckoutAddress?.addressId) === (address.id || address.addressId)
                            ? "bg-green-100 border-green-400"
                    : "bg-white"
                    }`}
                >
                    {/* Top: Recipient + Default tag + Selected tag */}
                    <div className="flex items-center mb-1">
                        <span className="font-bold text-lg mr-2">{address.receiverName}</span>
                        {address.isDefault && (
                            <span className="text-xs bg-yellow-400 text-white px-2 py-0.5 rounded mr-2">Default</span>
                        )}
                        {(selectedUserCheckoutAddress?.id || selectedUserCheckoutAddress?.addressId) === (address.id || address.addressId) && (
                            <FaCheckCircle className="text-green-500 ml-1" />
                            )}
                        </div>
                    {/* Phone number */}
                    <div className="text-sm text-gray-700 mb-1">{address.phone}</div>
                    {/* Detailed address */}
                    <div className="text-sm text-gray-800 mb-1">{address.detail}</div>
                    {/* City, Province, ZipCode, Country */}
                    <div className="text-sm text-gray-600 mb-1">
                        {[address.city, address.province, address.zipCode, address.country].filter(Boolean).join(', ')}
                    </div>
                    {/* Edit/Delete buttons */}
                <div className="flex gap-3 absolute top-4 right-2">
                        <button
                            onClick={e => { e.stopPropagation(); onEditButtonHandler(address); }}
                            title="Edit"
                        >
                        <FaEdit size={18} className="text-teal-700" />
                    </button>
                        <button
                            onClick={e => { e.stopPropagation(); onDeleteButtonHandler(address); }}
                            title="Delete"
                        >
                        <FaTrash size={17} className="text-rose-600" />
                    </button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default AddressList