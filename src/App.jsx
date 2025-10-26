import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import Landing from "./pages/Landing";
import Tickets from "./pages/dashboard/Tickets";
import Settings from "./pages/dashboard/Settings";
import { UserContext } from "./context/UserContext.jsx";
import Home from "./pages/dashboard/Home.jsx";
import SignIn from "./pages/auth/SignIn.jsx";
import SignUp from "./pages/auth/SignUp.jsx";

function App() {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected dashboard routes */}
        {user ? (
          // <Route element={<DashboardLayout />}>`
          <>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/ticket" element={<Tickets />} />
            <Route path="/setting" element={<Settings />} />
          </>
        ) : (
          // </Route>
          <Route path="*" element={<Navigate to="/signin" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
