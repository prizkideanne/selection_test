import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-8 border-b-8 border-t-red-500 border-b-blue-500"></div>
    </div>
  );
}

export default LoadingSpinner;
