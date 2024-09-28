import { useEffect, useState } from 'react'
import TaskCard from './TaskCard'

function App() {
  const [tasks, setTasks] = useState([])
  const columns = ['todo', 'in-progress', 'done'].map((status) => {
    const tasksInColumn = tasks.filter((task) => task.status === status)
    return {
      status,
      tasks: tasksInColumn
    }
  })

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      })
  }, [])

  const updateTask = (task) => {
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const updatedTasks = tasks.map((t) => {
      return t.id === task.id ? task : t
    })
    setTasks(updatedTasks)
  }

  const handleDrop = (e, status) => {
    e.preventDefault()
    setCurrentlyHoveringOver(null)
    const id = e.dataTransfer.getData("id")
    const task = tasks.find((task) => task.id === id)
    if (task) {
      updateTask({ ...task, status })
    }
  }

  const [currentlyHoveringOver, setCurrentlyHoveringOver] = useState(null);
  const handleDragEnter = (status) => {
    setCurrentlyHoveringOver(status)
  }

  return (
    <div className="flex divide-x">
      {columns.map((column, index) => (
        <div
          key={index}
          onDrop={(e) => handleDrop(e, column.status)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => handleDragEnter(column.status)}
        >
          <div className="flex justify-between text-3xl p-2 font-bold text-gray-500">
            <h2 className="capitalize">{column.status}</h2>
            {column.tasks.reduce((total, task) => total + (task?.points || 0), 0)}
          </div>
          <div className={`h-full ${currentlyHoveringOver === column.status ? 'bg-gray-200' : ''}`}>
            {column.tasks.map((task) => (
              <TaskCard
                task={task}
                updateTask={updateTask}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default App;
