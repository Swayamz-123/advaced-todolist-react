import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

function TodoForm() {
  const [todo, setTodo] = useState("")
  const { addTodo } = useTodo()

  const add = (e) => {
    e.preventDefault()
    if (!todo) return
    addTodo({ todo, completed: false })
    setTodo("")
  }

  return (
    <form onSubmit={add} className="flex w-full">
    <input
  type="text"
  placeholder="💡 Enter your quest..."
  className="w-full border border-cyan-400 rounded-l-lg px-3 outline-none duration-150 bg-black text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-300"
  value={todo}
  onChange={(e) => setTodo(e.target.value)}
/>


      <button
        type="submit"
        className="px-5 py-2 font-bold uppercase text-sm tracking-wider text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-purple-500 hover:to-pink-500 rounded-r-lg shadow-[0_0_12px_rgba(255,0,255,0.4)] transition-all duration-300 hover:scale-105"
      >
        Add
      </button>
    </form>
  )
}

export default TodoForm
