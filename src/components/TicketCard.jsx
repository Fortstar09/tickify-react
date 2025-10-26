import { useState, useRef, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";

const TicketCard = ({
  status = "Open",
  title,
  project,
  author,
  date,
  avatar,
  onEdit,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const menuRef = useRef();

  const statusColor =
    status === "Open"
      ? "bg-green-100 text-green-700"
      : status === "In Progress"
      ? "bg-amber-100 text-amber-700"
      : "bg-gray-100 text-gray-700";

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteClick = () => {
    setMenuOpen(false);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    onDelete?.();
  };

  return (
    <>
      <div className="relative bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
        {/* Top section */}
        <div className="flex justify-between items-start">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor}`}
          >
            {status}
          </span>

          {/* Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
            >
              <FiMoreVertical className="text-gray-500" size={18} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10 animate-fadeIn">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onEdit?.();
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Ticket info */}
        <div className="mt-3">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-500 text-sm">Project: {project}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <img
              src={avatar || "https://i.pravatar.cc/40"}
              alt={author}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-700">{author}</span>
          </div>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Confirm Delete
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to delete <b>{title}</b>? This action cannot
              be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-500 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketCard;
