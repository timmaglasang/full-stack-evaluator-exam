import { useEffect, useState } from 'react';
import api from "../src/api/axios";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        api.get('/tasks').then(res => setTasks(res.data)).catch(err => console.error(err));
    }, []);
    return (<div> <h2>Tasks</h2>
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
            <thead> <tr> <th>ID</th> <th>Title</th> <th>Status</th> </tr> </thead> <tbody> {tasks.map(task => (<tr key={task.id}> <td>{task.id}</td> <td>{task.title}</td> <td>{task.isDone ? "✅ Done" : "❌ Pending"}</td> </tr>))} </tbody> </table> </div>);
}
export default Tasks;
