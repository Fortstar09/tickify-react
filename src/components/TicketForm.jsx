import { useState, useEffect } from "react";

const TicketForm = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    project: "",
    author: "",
    status: "Open",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Ticket" : "Create Ticket"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border border-[#efefef] rounded-md px-3 py-2 w-full"
          />
          <input
            type="text"
            name="project"
            placeholder="Project"
            value={formData.project}
            onChange={handleChange}
            required
            className="border border-[#efefef] rounded-md px-3 py-2 w-full"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
            className="border border-[#efefef] rounded-md px-3 py-2 w-full"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-[#efefef] rounded-md px-3 py-2 w-full"
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
