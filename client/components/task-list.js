import React, { useState } from 'react'
import TaskListItem from './task-list-item'
import TimeSpan from './timespan'

const taskList = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [newTask, setNewTask] = useState('')
  return (
    <div>
      <TimeSpan category={props.category} />
      {props.tasks.map((el) => (
        <TaskListItem
          title={el.title}
          taskId={el.taskId}
          status={el.status}
          updateStatus={props.updateStatus}
          updateTitle={props.updateTitle}
          deleteTask={props.deleteTask}
        />
      ))}
      <div>
        <input
          type="text"
          className="bg-teal-100 rounded-l-lg w-9/12 p-1 text-black"
          placeholder="Enter task name..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className=" p-1 bg-blue-700 rounded-r-lg px-3 text-white"
          type="button"
          onClick={() => props.addTask(newTask)}
        >
          Add
        </button>
        {props.alert && <div>{props.alert}</div>}
      </div>
    </div>
  )
}
export default taskList
