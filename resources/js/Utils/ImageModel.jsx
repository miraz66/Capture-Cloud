import React, { useRef, useEffect } from "react";

export default function ImageModal({
    showModal,
    setShowModal,
    imageId,
    projects,
}) {
    const modalContentRef = useRef(null);

    console.log(projects);

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
                            className="relative top-10 my-6 mx-auto w-[100rem] bg-white rounded-md"
                        >
                            {/*content*/}
                            <div className="">
                                <img
                                    className="max-h-[55rem] pt-20 mx-auto"
                                    src={projects.image_path}
                                    alt="images"
                                />
                            </div>
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
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
