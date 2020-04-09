import React, { useState } from 'react'
import styles from './styles.css'
import ListItem from './ListItem'
import Button from '../Button/Button'
import Edit from '../Edit/Edit'

const List = ({ data, setData }) => {
  const [editId, setEditId] = useState(false)

  function handleRemoveTodo(id) {
    setData((data) => {
      delete data[id]

      return { ...data }
    })
  }

  function showEditTodo(id) {
    setEditId(id)
  }

  function handleCloseEdit() {
    setEditId(false)
  }

  function listItems() {
    return Object.keys(data).map((id) => {
      const name = data[id].name
      const desc = data[id].desc

      return (
        <ListItem data-cy="todo-list-item" key={id} className={styles.listItem}>
          <div className={styles.content}>
            <span data-cy="name" className={styles.name}>
              {name}
            </span>
            <span data-cy="desc" className={styles.desc}>
              {desc}
            </span>
          </div>
          <div className={styles.controls}>
            <Button
              type="button"
              onClick={() => showEditTodo(id)}
              data-cy="edit"
            >
              Edit
            </Button>
            <Button
              type="button"
              onClick={() => handleRemoveTodo(id)}
              data-cy="remove"
            >
              &times;
            </Button>
            {editId === id && (
              <Edit
                id={id}
                item={data[id]}
                handleCloseEdit={handleCloseEdit}
                setData={setData}
              />
            )}
          </div>
        </ListItem>
      )
    })
  }

  console.log(JSON.stringify(data))

  return <ul className={styles.list}>{listItems()}</ul>
}

export default List
