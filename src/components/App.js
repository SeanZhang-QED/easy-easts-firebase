import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { ThemeProvider } from "@mui/material";
import PrivateRoute from "./widgets/PrivateRoute";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import theme from "../theme/theme";
import LikesPage from "./pages/LikesPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/"
              element=
              {
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="user/likes"
              element=
              {
                <PrivateRoute>
                  <LikesPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
