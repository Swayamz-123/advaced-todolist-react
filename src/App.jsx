import { useState, useEffect } from 'react'
import { TodoProvider } from './contexts'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    )
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] py-8">
        <div className="w-full max-w-2xl mx-auto rounded-2xl bg-black/30 backdrop-blur-md px-6 py-6 text-white shadow-[0_0_20px_rgba(0,255,255,0.4)] border border-white/10">
          <h1 className="text-3xl font-bold text-center mb-10 text-cyan-300 drop-shadow-[0_0_6px_cyan]">🎯 Manage Your Quests</h1>
          
          <div className="mb-6">
            <TodoForm />
          </div>

          <div className="flex flex-wrap gap-y-4">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <div className="bg-white/5 border-l-4 border-cyan-400 rounded-xl p-4 transition-transform transform hover:scale-[1.02] shadow-[0_0_10px_rgba(0,255,255,0.3)]">
                  <TodoItem todo={todo} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
