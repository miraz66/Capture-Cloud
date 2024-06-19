import React from "react";
import { CubeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import NavLi from "./NavLi";

const Nav = () => {
  return (
    <div className="w-full  bg-orange-500 shadow-xl fixed z-10">
      <div className="w-8/12 m-auto pb-5 pt-3 flex justify-between items-center">
        <CubeIcon className="w-20 h-20 shadow-lg shadow-black p-1 rounded-md cursor-pointer active:text-white select-none " />
        <div className="">
          <ul className=" flex gap-10 font-semiboldbold text-xl">
            <li>{NavLi("Home")}</li>
            <li>{NavLi("About")}</li>
            <li>{NavLi("Contact")}</li>
            <li className="">
              <a className="flex  items-center gap-1" href="">
                {" "}
                <UserCircleIcon className="w-6 text-gray-500 text-base" />
                {NavLi("Profile")}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
