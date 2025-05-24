import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerNewUser } from '../../store/actions';
import InputField from '../shared/InputField';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        dispatch(registerNewUser(data, navigate));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create a new account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <InputField
                            label="Username"
                            required
                            id="username"
                            type="text"
                            message="Please enter your username"
                            placeholder="Enter your username"
                            register={register}
                            errors={errors}
                            min={3}
                        />
                        <InputField
                            label="Email"
                            required
                            id="email"
                            type="email"
                            message="Please enter your email"
                            placeholder="Enter your email"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Phone"
                            required
                            id="phone"
                            type="tel"
                            message="Please enter your phone number"
                            placeholder="Enter your phone number"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Password"
                            required
                            id="password"
                            type="password"
                            message="Please enter your password"
                            placeholder="Enter your password"
                            register={register}
                            errors={errors}
                            min={6}
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                'Sign up'
                            )}
                        </button>
                    </div>

                    <div className="text-sm text-center">
                        <Link
                            to="/login"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Already have an account? Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register; 