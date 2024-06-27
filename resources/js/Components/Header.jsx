import { useState, useEffect, useRef } from "react";
import Dropdown from "@/Components/Dropdown";
// import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, router } from "@inertiajs/react";
import logo from "@/Assets/logo.png";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import Modal from "./Modal";
import SubmitImages from "@/Pages/Home/SubmitImages";
import TextInput from "./TextInput";

export default function Header({ user, children, queryParams = null }) {
  queryParams = queryParams || {};

  const searchFieldChange = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("home.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChange(name, e.target.value);
  };

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

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white border-b border-gray-100">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex">
                <div className="shrink-0 flex items-center">
                  <Link href="/">
                    <img className="h-12 w-12" src={logo} alt="logo" />
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
                      : "shadow-0 bg-gray-200"
                  )}
                >
                  <button>
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
                  </button>
                  <TextInput
                    placeholder="Search photos and illustrations"
                    className={clsx(
                      "w-full border-none focus:ring-0 focus:ring-offset-0",
                      isFocused ? "bg-white" : "bg-gray-100/30"
                    )}
                    defaultValue={queryParams.feature}
                    onBlur={(e) => searchFieldChange(e.target.value)}
                    onKeyPress={(e) => onKeyPress("feature", e)}
                  />
                </div>
              </div>

              <div className="hidden sm:flex sm:items-center">
                <button
                  onClick={() => {
                    if (user) {
                      setShowModal(true);
                    } else {
                      handleLoginClick();
                    }
                  }}
                  className="bg-gray-50/20 border text-nowrap px-4 py-1 rounded-lg text-gray-600 hover:text-gray-800 hover:border-gray-500 duration-200 ease-in-out"
                >
                  Submit an image
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
        <SubmitImages />
      </Modal>
    </>
  );
}
