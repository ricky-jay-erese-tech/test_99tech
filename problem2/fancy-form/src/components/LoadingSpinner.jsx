import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
        </div>
    );
};

export default LoadingSpinner;
