import React, { useState } from 'react'
import './styles.scss'
import '../assets/scss/main.scss'

const TaskListItem = (props) => {
  const [editingMode, setEditingMode] = useState(false)
  const [editingName, setEditingName] = useState(props.title)
  return (
    <div className="flex mb-8 justify-between text-white text-lg ">
      {editingMode ? (
        <div>
          <button
            type="button"
            className="bg-black text-white mr-3  px-3 rounded-md"
            onClick={() => {
              props.updateTitle(props.taskId, editingName)
              setEditingMode(false)
            }}
          >
            Save
          </button>
          <input
            type="text"
            className="bg-gray-300 text-black"
            value={editingName}
            onChange={(e) => setEditingName(e.target.value)}
          />
        </div>
      ) : (
        <div className="flex">
          <button
            type="button"
            className="bg-black text-white mr-3 px-3 rounded-md"
            onClick={() => setEditingMode(true)}
          >
            Edit
          </button>
          <div key={props.taskId}>{props.title}</div>
          <div className="switch-status">
            {props.status === 'new' && (
              <button
                className="bg-orange-500 ml-2 px-3 rounded-md text-white"
                type="button"
                onClick={() => props.updateStatus(props.taskId, 'in progress')}
              >
                In progress
              </button>
            )}
            {props.status === 'in progress' && (
              <div>
                <button
                  className="bg-red-600 mr-4 ml-2 px-3 rounded-md text-white"
                  type="button"
                  onClick={() => props.updateStatus(props.taskId, 'blocked')}
                >
                  Blocked
                </button>
                <button
                  className="bg-green-400 px-3 rounded-md text-white"
                  type="button"
                  onClick={() => props.updateStatus(props.taskId, 'done')}
                >
                  Done
                </button>
              </div>
            )}
            {props.status === 'blocked' && (
              <button
                className="bg-blue-400 mr-4 ml-2 px-3 rounded-md text-white"
                type="button"
                onClick={() => props.updateStatus(props.taskId, 'in progress')}
              >
                Unblock
              </button>
            )}
            {props.status === 'done' && (
              <button
                className="bg-red-700 mr-4 ml-2 px-3 rounded-md text-white"
                type="button"
                onClick={() => props.deleteTask(props.taskId, 'done')}
              >
                delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default TaskListItem
