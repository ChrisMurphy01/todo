import React, { useState } from 'react'
import styles from './styles.css'

import AddTodo from '../AddTodo/AddTodo'
import List from '../List/List'

const Todo = () => {
  const [data, setData] = useState([])

  return (
    <>
      <AddTodo setData={setData} />
      <List data={data} setData={setData} />
    </>
  )
}

export default Todo
