import React from "react";

const NavLi = (props) => {
  return (
    <div>
      <div
        className="
      after:content-[' '] after:bg-white after:m-auto after:block 
      after:w-0 after:h-[2px] after:ease-in after:duration-300 
      after:hover:w-full cursor-pointer after:bg-gradient-to-r after:from-blue-600 after:to-pink-500"
      >
        <a href="#">{props}</a>
      </div>
    </div>
  );
};

export default NavLi;
