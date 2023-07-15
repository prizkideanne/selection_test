import React from "react";
import LogoIcon from "../assets/logo.png";

function Logo() {
  return (
    <div className="flex flex-row items-center justify-center">
      <img src={LogoIcon} alt="logo" className="w-10 h-10" />
      <h1 className="mt-2 ml-3 text-center text-xl font-medium text-gray-900">
        HereNow
      </h1>
    </div>
  );
}

export default Logo;
