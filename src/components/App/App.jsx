import React from 'react'
import styles from './styles.css'
import Todo from '../Todo/Todo'

const App = () => {
  return (
    <div className={styles.app} data-cy="app">
      <Todo />
    </div>
  )
}

export default App
