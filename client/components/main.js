import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'
import '../assets/scss/main.scss'

const Main = (props) => {
  const [category, setCategory] = useState('')
  return (
    <div>
      {props.categories.map((item) => (
        <div key={item} className="tasks">
          <Link to={`/${item}`}>{item}</Link>
        </div>
      ))}
      <input
        type="text"
        placeholder="Enter category name..."
        className="bg-teal-100 rounded-l-lg mt-4 p-1 text-black"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button
        className="rounded-r-lg bg-blue-700 p-1 px-2 text-white"
        type="button"
        onClick={() => props.addCategory(category)}
      >
        Add
      </button>
      {props.alert && <div>{props.alert}</div>}
    </div>
  )
}
export default Main
