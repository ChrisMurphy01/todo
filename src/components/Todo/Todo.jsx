import React, { useState } from 'react'
import styles from './styles.css'

import AddTodo from '../AddTodo/AddTodo'
import List from '../List/List'
import Wrapper from '../Wrapper/Wrapper'

const Todo = () => {
  const [data, setData] = useState({})

  return (
    <Wrapper>
      <h1>Todo</h1>
      <AddTodo setData={setData} />
      <List data={data} setData={setData} />
    </Wrapper>
  )
}

export default Todo
