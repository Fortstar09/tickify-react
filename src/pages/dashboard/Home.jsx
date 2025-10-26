import { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import DashboardHeader from "../../components/DashboardHead";
import { formatRelativeDate } from "../../lib/utils";

const Home = () => {
  const { user } = useContext(UserContext);
  const [tickets, setTickets] = useState([]);

  // Load tickets from localStorage
  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem("AllTickets")) || [];
    setTickets(storedTickets);
  }, []);

  // Counts by status
  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "Open").length;
  const closedTickets = tickets.filter((t) => t.status === "Closed").length;
  const pendingTickets = tickets.filter((t) => t.status === "In Progress").length;

  // Sort tickets by newest first
  const recentTickets = [...tickets]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 5); // show latest 5

  return (
    <DashboardLayout>
      <div>
        {/* Welcome */}
        <DashboardHeader
          title={`Welcome, ${user.fullname}`}
          subtitle="Here's a summary of your tickets"
        />

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg border border-[#efefef]">
            <h3 className="text-lg font-medium text-gray-700">Total Tickets</h3>
            <p className="text-3xl font-semibold text-blue-600 mt-2">
              {totalTickets}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-[#efefef]">
            <h3 className="text-lg font-medium text-gray-700">Open Tickets</h3>
            <p className="text-3xl font-semibold text-green-600 mt-2">
              {openTickets}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-[#efefef]">
            <h3 className="text-lg font-medium text-gray-700">Closed Tickets</h3>
            <p className="text-3xl font-semibold text-red-600 mt-2">
              {closedTickets}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-[#efefef]">
            <h3 className="text-lg font-medium text-gray-700">
              Pending Tickets
            </h3>
            <p className="text-3xl font-semibold text-yellow-600 mt-2">
              {pendingTickets}
            </p>
          </div>
        </div>

        {/* Recent tickets */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium text-gray-700">
              Recent Tickets
            </h3>
            <a
              href="/ticket"
              className="text-base bg-blue-600 text-white py-2 px-4 font-semibold rounded-md cursor-pointer hover:bg-blue-500"
            >
              Add new ticket
            </a>
          </div>

          <div className="bg-white p-4 rounded-lg border border-[#efefef]">
            {recentTickets.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No tickets created yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {recentTickets.map((ticket) => (
                  <li
                    key={ticket.id}
                    className="flex justify-between items-center border-b border-gray-200 pb-4 last:border-none"
                  >
                    <div>
                      <p className="text-gray-600">
                        {ticket.title} — <span className="text-gray-500">{ticket.project}</span>
                      </p>
                      <span className="text-sm text-gray-400">
                        {formatRelativeDate(ticket.time)}
                      </span>
                    </div>
                    <span
                      className={`font-light ${
                        ticket.status === "Open"
                          ? "text-green-700"
                          : ticket.status === "In Progress"
                          ? "text-amber-700"
                          : "text-gray-700"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
