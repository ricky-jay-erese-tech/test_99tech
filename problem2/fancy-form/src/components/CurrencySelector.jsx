import React from "react";

const CurrencySelector = ({ label, value, onChange, options }) => {
    return (
        <div>
            <label className="block text-gray-700">{label}</label>
            <select
                value={value}
                onChange={onChange}
                className="mt-1 p-2 w-full border rounded"
            >
                {options.map((currency) => (
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CurrencySelector;
