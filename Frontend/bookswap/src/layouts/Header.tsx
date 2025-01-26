import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import Icon from "../assets/BookSwapLogo.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";
import { GetMyUser } from "../services/usersService";
import { navigation } from "../data/navigation";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [userData, setUserData] = useState<{
    username: string;
  } | null>(null);
  const [, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUserData(null);
        return;
      }

      try {
        const response = await GetMyUser();
        const { username } = response?.data;
        setUserData({ username });
      } catch (error) {
        setError(`Failed to load user data: ${error}`);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setUserData(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="fixed top-0 left-0 w-full px-2 sm:px-6 lg:px-8 bg-orange-900 z-20">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-100 hover:bg-orange-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <a href="/">
                <img alt="TaskQuest" src={Icon} className="h-9 w-auto" />
              </a>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  const isBook = item.name === "Books";
                  const isAccessible = isBook || userData;

                  return (
                    <a
                      key={item.name}
                      href={isAccessible ? item.href : "#"}
                      aria-current={
                        location.pathname === item.href ? "page" : undefined
                      }
                      className={classNames(
                        location.pathname === item.href
                          ? "bg-orange-800 text-white"
                          : isAccessible
                          ? "text-gray-100 hover:bg-orange-800 hover:text-white"
                          : "text-gray-100 cursor-not-allowed",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      onClick={(e) => {
                        if (!isAccessible) e.preventDefault();
                      }}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {userData ? (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="flex items-center text-sm text-white">
                    <img
                      alt="UserIcon"
                      src="https://pngimg.com/d/anonymous_mask_PNG28.png"
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="ms-1 mr-2">
                      Hello, {userData.username}
                    </span>
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                >
                  <MenuItem>
                    <a
                      href="/Profile"
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <Menu as="div" className="relative ml-3">
                <MenuButton className="text-white text-sm">
                  Authentication
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                >
                  <MenuItem>
                    <a
                      href="/Authentication/Login"
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Login
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="/Authentication/Registration"
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Registration
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
