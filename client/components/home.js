import React, { useEffect, useState } from 'react'
import { Route, useParams } from 'react-router-dom'
import axios from 'axios'
import Main from './main'
import TaskList from './task-list'
import './styles.scss'
import '../assets/scss/main.scss'

const Home = () => {
  const { category, timespan } = useParams()
  const [categories, setCategories] = useState([])
  const [tasks, setTasks] = useState([])
  const [alert, setAlert] = useState('')
  useEffect(() => {
    axios('/api/v1/category').then(({ data }) => setCategories(data))
  }, [])
  useEffect(() => {
    if (typeof category !== 'undefined' && timespan === undefined) {
      axios(`/api/v1/tasks/${category}`).then(({ data }) => setTasks(data))
    }
    if (typeof timespan !== 'undefined') {
      axios(`/api/v1/tasks/${category}/${timespan}`).then(({ data }) => setTasks(data))
    }
  }, [category, timespan])

  const alertMessage = (message) => {
    setAlert(message)
    setTimeout(() => {
      setAlert('')
    }, 3000)
  }
  const addTask = (taskTitle) => {
    if (taskTitle) {
      axios
        .post(`/api/v1/tasks/${category}`, { title: taskTitle })
        .then(({ data }) => setTasks([...tasks, data.newTask]))
    } else {
      alertMessage('enter taskName')
    }
  }
  const addCategory = (newCategory) => {
    if (newCategory) {
      axios.post(`/api/v1/tasks/${newCategory}`)
      setCategories([...categories, newCategory])
    } else {
      alertMessage('enter categoryName')
    }
  }
  const updateStatus = (id, status) => {
    axios.patch(`/api/v1/tasks/${category}/${id}`, { status })
    setTasks(tasks.map((el) => (el.taskId === id ? { ...el, status } : el)))
  }
  const updateTitle = (id, title) => {
    axios.patch(`/api/v1/tasks/${category}/${id}`, { title })
    setTasks(tasks.map((el) => (el.taskId === id ? { ...el, title } : el)))
  }
  const deleteTask = (id) => {
    axios.delete(`/api/v1/tasks/${category}/${id}`)
    setTasks(tasks.filter((el) => el.taskId !== id))
  }

  return (
    <div className=" flex img">
      <div className="bg-gray-600 rounded-lg m-auto p-16 text-white">
        <Route
          exact
          path="/"
          component={() => <Main categories={categories} addCategory={addCategory} alert={alert} />}
        />
        <Route
          exact
          path="/:category"
          component={() => (
            <TaskList
              alert={alert}
              category={category}
              tasks={tasks}
              addTask={addTask}
              updateStatus={updateStatus}
              updateTitle={updateTitle}
              deleteTask={deleteTask}
            />
          )}
        />
        <Route
          exact
          path="/:category/:timespan"
          component={() => (
            <TaskList
              alert={alert}
              category={category}
              tasks={tasks}
              addTask={addTask}
              updateStatus={updateStatus}
              updateTitle={updateTitle}
              deleteTask={deleteTask}
            />
          )}
        />
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
