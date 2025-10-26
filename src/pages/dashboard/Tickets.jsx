import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/DashboardHead";
import TicketCard from "../../components/TicketCard";
import TicketForm from "../../components/TicketForm";
import Toast from "../../components/Toast";
import { formatRelativeDate } from "../../lib/utils";

const Tickets = () => {
  const [showForm, setShowForm] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [message, setMessage] = useState("");

  // Load tickets from localStorage on mount
  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem("AllTickets")) || [];
    setTickets(storedTickets);
  }, []);

  // Save tickets back to localStorage
  const saveTickets = (updatedTickets) => {
    localStorage.setItem("AllTickets", JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
  };

  // Create or update ticket
  const handleFormSubmit = (ticketData) => {
    const existingTickets =
      JSON.parse(localStorage.getItem("AllTickets")) || [];

    if (editingTicket) {
      // Edit existing ticket
      const updatedTickets = existingTickets.map((t) =>
        t.id === editingTicket.id ? { ...t, ...ticketData } : t
      );
      saveTickets(updatedTickets);
      setEditingTicket(null);
      setMessage("Ticket updated successfully!");
    } else {
      // Add new ticket
      const newTicket = {
        id: Date.now(),
        ...ticketData,
        time: new Date().toISOString(),
      };
      const updatedTickets = [...existingTickets, newTicket];
      saveTickets(updatedTickets);
      setMessage("New ticket created successfully!");
    }

    setShowForm(false);
  };

  // Delete ticket
  const handleDelete = (id) => {
    const updatedTickets = tickets.filter((ticket) => ticket.id !== id);
    saveTickets(updatedTickets);
    setMessage("Ticket deleted successfully!");
  };

  // Edit ticket
  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setShowForm(true);
  };

  return (
    <DashboardLayout>
      <div>
        {/* Header */}
        <div className="flex justify-between items-start md:items-end flex-col gap-5 md:flex-row">
          <DashboardHeader
            title="Tickets"
            subtitle="Create and manage your tickets here"
          />
          <button
            onClick={() => {
              setEditingTicket(null);
              setShowForm(true);
            }}
            className="text-base bg-blue-600 text-white py-2 px-4 font-semibold rounded-md cursor-pointer hover:bg-blue-500"
          >
            Create ticket
          </button>
        </div>

        {/* Ticket Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                status={ticket.status}
                title={ticket.title}
                project={ticket.project}
                author={ticket.author}
                date={formatRelativeDate(ticket.time)}
                onEdit={() => handleEdit(ticket)}
                onDelete={() => handleDelete(ticket.id)}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full mt-10">
              No tickets yet — create one to get started!
            </p>
          )}
        </div>

        {/* Modal */}
        {showForm && (
          <TicketForm
            onClose={() => {
              setShowForm(false);
              setEditingTicket(null);
            }}
            onSubmit={handleFormSubmit}
            initialData={editingTicket}
          />
        )}

        {/* Toast Message */}
        {message && <Toast message={message} onClose={() => setMessage("")} />}
      </div>
    </DashboardLayout>
  );
};

export default Tickets;
