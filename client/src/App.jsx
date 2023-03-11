import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import { UserContext } from "./context/UserContextProvider";
import { useContext } from "react";

function App() {
  const { user } = useContext(UserContext);
  const { isAuthenticated } = user;

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/chats" element={<ChatPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
