import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Menu as MenuIcon, X } from "lucide-react"; // ✅ بدّلنا heroicons بـ lucide-react
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <Disclosure
      as="nav"
      className="backdrop-blur-md bg-white/60 border-b border-blue-100 fixed w-full z-50"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <MenuIcon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <X
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>

          {/* Logo */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="/logo.png"
                className="h-16 w-auto object-contain "
              />
            </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-2 mt-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 
    `}
                    style={{
                      color: item.current ? "#0c4a6e" : "#0c4a6e",
                    }}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Notification and Image Profile */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {!user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  style={{ color: "#0c4a6e" }}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-linear-to-r from-green-100 to-yellow-50 shadow-sm "
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={{ color: "#0c4a6e" }}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-linear-to-r from-green-100 to-yellow-50 shadow-sm "
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt={user.name}
                    src={
                      "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(user.name)
                    }
                    className="size-8 rounded-full bg-sky-100 border border-sky-200 shadow-sm"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white/80 backdrop-blur-md py-2 shadow-lg ring-1 ring-sky-100 transition"
                >
                  <MenuItem>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-sky-700 hover:bg-sky-50 hover:text-sky-900 rounded-md transition"
                    >
                      Your Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={logout}
                      className="w-full text-left block px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 hover:text-rose-800 rounded-md transition"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </div>

      {/* قائمة الموبايل */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-white/5 hover:text-white",
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
