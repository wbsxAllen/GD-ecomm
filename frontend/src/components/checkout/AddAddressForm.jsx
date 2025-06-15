import React, { useEffect } from 'react'
import InputField from '../shared/InputField'
import { useForm } from 'react-hook-form';
import { FaAddressCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Spinners from '../shared/Spinners';
import toast from 'react-hot-toast';
import { addUpdateUserAddress } from '../../store/actions';

const AddAddressForm = ({ address, setOpenAddressModal }) => {
    const dispatch = useDispatch();
    const { btnLoader } = useSelector((state) => state.errors);
    const {
            register,
            handleSubmit,
            reset,
            setValue,
            formState: {errors},
        } = useForm({
            mode: "onTouched",
        });

        const onSaveAddressHandler = async (data) => {
            dispatch(addUpdateUserAddress(
                data,
                toast,
                address?.id,
                setOpenAddressModal
            ));
        };

        useEffect(() => {
            if (address?.id) {
                setValue("country", address?.country);
                setValue("receiverName", address?.receiverName);
                setValue("phone", address?.phone);
                setValue("detail", address?.detail);
                setValue("city", address?.city);
                setValue("province", address?.province);
                setValue("zipCode", address?.zipCode);
                setValue("isDefault", address?.isDefault);
            }
        }, [address]);

  return (
    <div className="">
            <form
                onSubmit={handleSubmit(onSaveAddressHandler)}
                className="">
                    <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
                        <FaAddressCard className="mr-2 text-2xl"/>
                        {!address?.id ? 
                        "Add Address" :
                        "Update Address"
                        }
                    </div>
            <div className="flex flex-col gap-4">
                <InputField
                    label="Country/Region"
                    required
                    id="country"
                    type="text"
                    message="*Country is required"
                    placeholder="Enter Country"
                    register={register}
                    errors={errors}
                    />
                <InputField
                    label="Full name (First and Last name)"
                    required
                    id="receiverName"
                    type="text"
                    message="*Full name is required"
                    placeholder="Enter full name"
                    register={register}
                    errors={errors}
                    />
                <InputField
                    label="Phone number"
                    required
                    id="phone"
                    type="text"
                    message="*Phone number is required"
                    placeholder="Enter phone number"
                    register={register}
                    errors={errors}
                    />
                <InputField
                    label="Street address or P.O. Box"
                    required
                    id="detail"
                    type="text"
                    message="*Address is required"
                    placeholder="Street address or P.O. Box, Apt, Suite, Unit, Building"
                    register={register}
                    errors={errors}
                    />
                <InputField
                    label="City"
                    required
                    id="city"
                    type="text"
                    message="*City is required"
                    placeholder="Enter city"
                    register={register}
                    errors={errors}
                    />    
                <InputField
                    label="Province/Territory"
                    required
                    id="province"
                    type="text"
                    message="*Province is required"
                    placeholder="Enter province or territory"
                    register={register}
                    errors={errors}
                    />   
                <InputField
                    label="Postal code"
                    required
                    id="zipCode"
                    type="text"
                    message="*Postal code is required"
                    placeholder="Enter postal code"
                    register={register}
                    errors={errors}
                    />        
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="isDefault"
                        {...register("isDefault")}
                        className="w-4 h-4"
                    />
                    <label htmlFor="isDefault" className="text-sm">Make this my default address</label>
                </div>
            </div>

            <button
                disabled={btnLoader}
                className="text-white bg-customBlue px-4 py-2 rounded-md mt-4"
                type="submit">
                {btnLoader ? (
                    <>
                    <Spinners /> Loading...
                    </>
                ) : (
                    <>Save</>
                )}
            </button>
            </form>
        </div>
  )
}

export default AddAddressForm;