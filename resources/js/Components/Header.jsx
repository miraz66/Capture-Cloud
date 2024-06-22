import { useState, useEffect, useRef } from "react";
import Dropdown from "@/Components/Dropdown";
// import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import logo from "@/Assets/logo.png";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import Modal from "./Modal";
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";

export default function Header({ user, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const inputRef = useRef(null);

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFocused]);

  const handleLoginClick = () => {
    if (user) {
      window.location.href = "/"; // Redirect to the home page if the user is logged in
    } else {
      window.location.href = "/login"; // Redirect to the login page if the user is not logged in
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(false);
  };

  const handleImageChange = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white border-b border-gray-100">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex">
                <div className="shrink-0 flex items-center">
                  <Link href="/">
                    <img className="h-14 w-14" src={logo} alt="logo" />
                  </Link>
                </div>
              </div>

              <div className="w-full px-4">
                <div
                  ref={inputRef}
                  onClick={() => setIsFocused(!isFocused)}
                  className={clsx(
                    "w-full px-4 rounded-full flex border",
                    isFocused
                      ? "shadow-sm border bg-white"
                      : "shadow-0 bg-gray-100/30"
                  )}
                >
                  <button>
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
                  </button>
                  <input
                    type="text"
                    placeholder="Search photos and illustrations"
                    className={clsx(
                      "w-full border-none focus:ring-0 focus:ring-offset-0",
                      isFocused ? "bg-white" : "bg-gray-100/30"
                    )}
                  />
                </div>
              </div>

              <div className="hidden sm:flex sm:items-center">
                <button className="bg-gray-50/20 border px-4 py-1 rounded-lg text-gray-600 hover:text-gray-800 hover:border-gray-500 duration-200 ease-in-out">
                  <p
                    onClick={() => {
                      handleModalOpen();
                    }}
                    className="text-nowrap"
                  >
                    Submit an image
                  </p>
                </button>
                <div className="ms-3 relative">
                  {user ? (
                    <Dropdown>
                      <Dropdown.Trigger>
                        <span className="inline-flex rounded-md w-16 h-10">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                          >
                            <img
                              className="h-9 w-9 rounded-full border-2 p-[1px] object-cover"
                              src={user.user_image}
                              alt="avatar"
                            />
                          </button>
                        </span>
                      </Dropdown.Trigger>

                      <Dropdown.Content>
                        <Dropdown.Link href={route("profile.edit")}>
                          Profile
                        </Dropdown.Link>
                        <Dropdown.Link
                          href={route("logout")}
                          method="post"
                          as="button"
                        >
                          Log Out
                        </Dropdown.Link>
                      </Dropdown.Content>
                    </Dropdown>
                  ) : (
                    <button onClick={handleLoginClick}>
                      <UserCircleIcon className="w-9 h-9 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>

              <div className="-me-2 flex items-center sm:hidden">
                <button
                  onClick={() =>
                    setShowingNavigationDropdown(
                      (previousState) => !previousState
                    )
                  }
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className={
                        !showingNavigationDropdown ? "inline-flex" : "hidden"
                      }
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                    <path
                      className={
                        showingNavigationDropdown ? "inline-flex" : "hidden"
                      }
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div
            className={
              (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"
            }
          >
            {user ? (
              <>
                <div className="pt-2 pb-3 space-y-1">
                  <ResponsiveNavLink
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                  >
                    Dashboard
                  </ResponsiveNavLink>
                </div>

                <div className="pt-4 pb-1 border-t border-gray-200">
                  <div className="px-4">
                    <div className="font-medium text-base text-gray-800">
                      {user.name}
                    </div>
                    <div className="font-medium text-sm text-gray-500">
                      {user.email}
                    </div>
                  </div>

                  <div className="mt-3 space-y-1">
                    <ResponsiveNavLink href={route("profile.edit")}>
                      Profile
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                      method="post"
                      href={route("logout")}
                      as="button"
                    >
                      Log Out
                    </ResponsiveNavLink>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </nav>

        <main className="bg-white">{children}</main>
      </div>

      <Modal
        show={showModal}
        onClose={handleModalClose}
        title="Submit an image"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <InputLabel
                htmlFor="image"
                value="Image"
                className="text-gray-700"
              />

              <input
                type="file"
                id="image"
                name="image"
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-end mt-4">
            <PrimaryButton type="submit" className="ml-4">
              Submit
            </PrimaryButton>
          </div>
        </form>
      </Modal>
    </>
  );
}
