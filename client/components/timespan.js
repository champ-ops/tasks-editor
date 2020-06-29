import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'
import '../assets/scss/main.scss'

const timeSpan = (props) => {
  return (
    <div className="mb-4  flex justify-between style text-lg ">
      <Link to={`/${props.category}`}>All days</Link>
      <Link to={`/${props.category}/day`}>Day</Link>
      <Link to={`/${props.category}/week`}>Week</Link>
      <Link to={`/${props.category}/month`}>Month</Link>
    </div>
  )
}

export default timeSpan
