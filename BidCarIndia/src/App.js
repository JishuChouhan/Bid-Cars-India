import { Routes, Route } from "react-router-dom";
import AdminRouting from "./AdminRouting";
import UserRouting from "./UserRouting";
import { useAuth } from "./contextAuth/AuthContext";

function App() {
  const { user } = useAuth();
  
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/*" element={<UserRouting />} />

      {user!= null && user.roles[0] === "ROLE_ADMIN" && (
        <Route path="/admin/*" element={<AdminRouting />} />
      )}
    </Routes>
  );
}

export default App;
