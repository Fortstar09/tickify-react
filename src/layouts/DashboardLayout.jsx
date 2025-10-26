import { useState } from "react";
import {
  FiFileText,
  FiLogOut,
} from "react-icons/fi";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { LuPanelRight } from "react-icons/lu";
import Toast from "../components/Toast";
import { LayoutDashboard, Settings } from "lucide-react";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [message, setMessage] = useState("");

  const { logout, user } = useContext(UserContext);

const LogoutUser = () => {
  logout();
  setMessage("Logout successful!"); 
};


  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
       {message && <Toast message={message} onClose={() => setMessage("")} />}
      <aside
        className={`${
          isSidebarOpen ? "w-48" : "w-16"
        } bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-blue-600 truncate">
            {isSidebarOpen ? (
              <div className="flex justify-center items-center gap-3">
                <img
                  src="/logo.svg"
                  alt="Tickify Logo"
                  className="w-5 h-5"
                />
                Tickify
              </div>
            ) : (
              <img
                src="/logo.svg"
                alt="Tickify Logo"
                className="w-5 h-5 m-1"
              />
            )}
          </h1>

        </div>

        <nav className="flex-1 mt-5 space-y-3">
          <a
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <LayoutDashboard size={18} />
            {isSidebarOpen && <span>Dashboard</span>}
          </a>
          <a
            href="/ticket"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <FiFileText size={18} />
            {isSidebarOpen && <span>Tickets</span>}
          </a>
          <a
            href="/setting"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <Settings size={18} />
            {isSidebarOpen && <span>Settings</span>}
          </a>
        </nav>

        <div
          className="p-4 border-t border-gray-200 cursor-pointer hover:bg-gray-50"
          onClick={logout}
        >
          <button className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-600 w-full">
            <FiLogOut size={18} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3">
          <LuPanelRight
            className="cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <div className="flex gap-5 justify-center items-center">
            <span className="text-base font-semibold text-white bg-blue-600 cursor-pointer rounded-full flex items-center justify-center w-8 h-8">
              {user?.fullname
                ? user.fullname[0].toUpperCase()
                : user?.fullname[0].toUpperCase()}
            </span>
            <button
              className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 my-1  px-2 py-1.5 rounded-md cursor-pointer"
              onClick={LogoutUser}
            >
              <FiLogOut size={16} />
            </button>
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          {/* <div className="text-gray-500 text-center w-full h-dvh"> */}
          {children}
          {/* </div> */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
