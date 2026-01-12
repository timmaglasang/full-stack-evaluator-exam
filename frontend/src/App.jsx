import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Tasks from "./Tasks";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/tasks" element={<Tasks />} />
            </Routes>
        </Router>
    );
}

export default App;
