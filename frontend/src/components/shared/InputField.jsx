import React from 'react';

const InputField = ({
    label,
    required,
    id,
    type,
    message,
    placeholder,
    register,
    errors,
    min,
}) => {
    // 合并 pattern 校验逻辑
    let pattern;
    if (type === 'email') {
        pattern = {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Please enter a valid email address',
        };
    } else if (type === 'tel') {
        pattern = {
            value: /^1[3-9]\d{9}$/,
            message: 'Please enter a valid phone number',
        };
    }

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                {...register(id, {
                    required: required && message,
                    minLength: min && {
                        value: min,
                        message: `Minimum ${min} characters required`,
                    },
                    ...(pattern ? { pattern } : {}),
                })}
                type={type}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {errors[id] && (
                <p className="text-red-500 text-xs">{errors[id].message}</p>
            )}
        </div>
    );
};

export default InputField; 