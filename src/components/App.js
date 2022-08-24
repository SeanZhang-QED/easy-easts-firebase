import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "../contexts/AuthContext"
import PrivateRoute from "./PrivateRoute"
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>}
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
