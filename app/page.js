
import ProtectedRoute from "../src/components/ProtectedRoute";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <ProtectedRoute requiredPermission="view_dashboard">
   
        <Dashboard />
   
    </ProtectedRoute>
  );
}
