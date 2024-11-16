import { useState } from "react";


const InputCreate = ({fetchData}) => {
    const [input, setInput] = useState('');
    const [successMessage, setSuccessMessage] = useState("");
    const [localTasks, setLocalTasks] = useState([]);

    const handleInputChange = (e) => {
        setInput(e.target.value)
    };

const addTask = async () => {
    if (!input.trim()) {
        alert("Please enter a valid task.");
        return;
      }
      const urlApi = "http://localhost:5000/create";
      const newTask = { title: input };
      try {
        await fetch(urlApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });
  
        setInput(""); 
        setSuccessMessage("Task successfully added!");
        fetchData(); 
        setLocalTasks([...localTasks, { title: input }]);
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Error adding task:", error);
        setSuccessMessage("Error adding task.");
      }
    };

return (
    <>
    <input type="text" placeholder="Write your task" value={input} onChange={handleInputChange} />
    <button type="button" onClick={addTask}>Add Task</button>
    {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    <ul>
      {localTasks.map((task, index) => (
        <li key={index}>{task.title}</li>
      ))}
    </ul>
    </>
)
}

export default InputCreate;