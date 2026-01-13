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


//import React, { useEffect } from "react";
//import api from "../src/api/axios";

//function App() {
//    useEffect(() => {
//        const testApi = async () => {
//            try {
//                const res = await api.get("https://localhost:7144/tasks");
//                console.log("Tasks from backend:", res.data);
//            } catch (err) {
//                console.error("Error calling API:", err);
//            }
//        };

//        testApi();
//    }, []);



//    return <h1>Check the console for API response</h1>;
//}

//export default App;
