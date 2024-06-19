import clsx from "clsx";
import React, { useRef, useEffect, useState } from "react";
import {
  CheckIcon,
  HeartIcon,
  PlusIcon,
  CalendarDaysIcon,
  EllipsisHorizontalIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { IoIosShareAlt } from "react-icons/io";

function MyComponent() {
  return (
    <div>
      <BeakerIcon className="size-6 text-blue-500" />
      <p>...</p>
    </div>
  );
}

export default function ImageModal({ showModal, setShowModal, projects }) {
  const modalContentRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleClickOutside = (event) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(event.target)
    ) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div
              ref={modalContentRef}
              className="relative top-20 my-6 mx-auto w-[100rem] bg-white rounded-md"
            >
              {/*content*/}
              <div className="m-4 flex justify-between items-center">
                <div className="flex gap-2">
                  <img
                    className="rounded-full w-10 h-10 object-cover"
                    src={projects.created_by.user_image}
                    alt="avatar"
                  />
                  <div>
                    <h5 className="text-sm tracking-tight uppercase">
                      {projects.created_by.name}
                    </h5>
                    <div className="flex gap-2 items-center">
                      <p className="text-xs text-blue-500 tracking-tight">
                        Available for hire
                      </p>
                      <CheckIcon className="h-3 w-3 p-0.5 rounded-full bg-blue-500 text-white" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <HeartIcon className="h-8 w-8 px-1.5 border border-gray-300 hover:border-gray-500 ease-in-out duration-200 rounded-md cursor-pointer" />
                  <PlusIcon className="h-8 w-8 px-1.5 border border-gray-300 hover:border-gray-500 ease-in-out duration-200 rounded-md cursor-pointer" />
                  <button className="border px-4 border-gray-300 hover:border-gray-500 ease-in-out duration-200 rounded-md">
                    Download
                  </button>
                </div>
              </div>
              <div className="pb-10">
                <img
                  onClick={() => setIsZoomed(!isZoomed)}
                  className={clsx(
                    "pt-2 mx-auto ease-in-out duration-200",
                    isZoomed
                      ? "scale-[1.9] cursor-zoom-out"
                      : "scale-100 cursor-zoom-in max-h-[55rem]"
                  )}
                  src={projects.image_path}
                  alt="images"
                />
              </div>
              <div className="m-4 flex justify-between">
                <div>
                  <div>
                    <p className="text-gray-500">Featured in</p>
                    <p className="capitalize">{projects.feature}</p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <CalendarDaysIcon className="h-6 w-6 text-gray-500" />
                    <p>Published on {projects.created_by.created_at}</p>
                  </div>
                </div>
                <div>
                  <div className="flex gap-2">
                    <button className="flex gap-1 border py-1.5 px-4 border-gray-300 hover:border-gray-500 ease-in-out duration-200 rounded-md">
                      <IoIosShareAlt className="w-6 h-6 text-gray-500" />
                      <span>Share</span>
                    </button>
                    <button className="flex gap-2 border py-1.5 px-4 border-gray-300 hover:border-gray-500 ease-in-out duration-200 rounded-md">
                      <InformationCircleIcon className="w-6 h-6 text-gray-500" />
                      <span>Info</span>
                    </button>
                    <button className="flex gap-2 border py-1.5 px-4 border-gray-300 hover:border-gray-500 ease-in-out duration-200 rounded-md">
                      <EllipsisHorizontalIcon className="w-6 h-6" />
                      <span>More</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
