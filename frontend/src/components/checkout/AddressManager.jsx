import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddressInfo from './AddressInfo';
import { getUserAddresses } from '../../store/actions';

const AddressManager = () => {
  const address = useSelector(state => state.auth.address);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  return (
    <div className="min-h-[70vh] bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold mb-8">Your Addresses</h2>
      <div className="max-w-2xl mx-auto">
        <AddressInfo address={address} />
      </div>
    </div>
  );
};

export default AddressManager; 