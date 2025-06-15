import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowForward } from "react-icons/io";

const SidebarDrawer = ({ open, onClose, user }) => {
  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${open ? "opacity-40" : "opacity-0"}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 bg-[#232f3e] text-white flex items-center text-lg font-bold">
          <FaUserCircle className="mr-2 text-2xl" />
          Hello, {user?.username || "Sign in"}
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100vh-64px)] text-gray-900">
          <div className="font-bold text-xl mb-2">Trending</div>
          <div className="space-y-2 mb-4">
            <div className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Best Sellers</div>
            <div className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">New Releases</div>
            <div className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Movers & Shakers</div>
          </div>
          <div className="font-bold text-xl mb-2">Digital Content and Devices</div>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Echo & Alexa <IoMdArrowForward /></div>
            <div className="flex justify-between items-center hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Fire Tablets & Fire TV <IoMdArrowForward /></div>
            <div className="flex justify-between items-center hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Amazon Luna – Cloud Gaming <IoMdArrowForward /></div>
            <div className="flex justify-between items-center hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Kindle <IoMdArrowForward /></div>
            <div className="flex justify-between items-center hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Audible Audiobooks <IoMdArrowForward /></div>
            <div className="flex justify-between items-center hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Prime Video <IoMdArrowForward /></div>
            <div className="flex justify-between items-center hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Amazon Music <IoMdArrowForward /></div>
            <div className="flex justify-between items-center hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Amazon Appstore <IoMdArrowForward /></div>
          </div>
          <div className="font-bold text-xl mb-2">Shop By Department</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Books <IoMdArrowForward /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarDrawer; 