import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

// We want to be able to access our tasks globally and because they are locally stored then we weill use state
// It's a good practice to use Redux ony other backEnd API to fetch data from the MAongo database
import { useState, useEffect } from 'react' 



function App() {
  const [showAddTask, setShowTask] = useState(false)


  const [tasks, setTasks] = useState([])

  useEffect(() =>{
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks() 
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  //fetch tasks

  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }
  
//  Delete Task

const deleteTask = async(id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',
  })

  setTasks(tasks.filter((task) => task.id !== id))
}

// Add task

const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
  
  const data = await res.json()

  setTasks([...tasks, data])
}
// Set Reminder

function toggleReminder(id){
  setTasks(tasks.map((task) => 
    task.id ===id ? {...task, 
    reminder: !task.reminder} : task
  ))
}

  return (
    <div className="container">
      
        <Header 
          onAdd={() => setShowTask(!showAddTask)} 
          showAdd={showAddTask}/>{showAddTask && <AddTask onAdd={addTask} />}
          {tasks.length > 0 ? 
          <Tasks tasks={tasks}  
          onDelete={deleteTask}  
          onToggle={toggleReminder} />: 'Currently there are no tasks...!'}
        
    </div>
  );
}


export default App
 