import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import LayoutSelector from "./components/Layouts/LayoutSelector";
import CVEditor from "./components/Editor/CVEditor";
import PublicCV from "./components/Common/PublicCV";
import ProtectedRoute from "./components/Common/ProtectedRoute";

function App() {
  const basename = process.env.PUBLIC_URL || "/";

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/cv/:id" element={<PublicCV />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/layouts"
          element={
            <ProtectedRoute>
              <LayoutSelector />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <CVEditor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editor/:id"
          element={
            <ProtectedRoute>
              <CVEditor />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
