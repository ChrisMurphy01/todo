import React, { useState } from 'react'
import styles from './styles.css'
import ListItem from './ListItem'
import Button from '../Button/Button'
import Edit from '../Edit/Edit'

const List = ({ data, setData }) => {
  const [showEdit, setShowEdit] = useState(false)

  function handleRemoveTodo(id) {
    setData((prev) => {
      let newList = prev.filter((item) => {
        return item.id !== id
      })

      return newList
    })
  }

  function showEditTodo(id) {
    setShowEdit(id)
  }

  function handleCloseEdit() {
    setShowEdit(false)
  }

  function listItems() {
    return data.map((item) => {
      const id = Object.keys(item)[0]
      const name = item[id].name
      const desc = item[id].desc

      return (
        <ListItem data-cy="todo-list-item" key={id}>
          <span data-cy="name">{name}</span>
          <span data-cy="desc">{desc}</span>
          <Button type="button" onClick={() => showEditTodo(id)}>
            Edit
          </Button>
          <Button type="button" onClick={() => handleRemoveTodo(id)}>
            &times;
          </Button>
          {showEdit === id && (
            <Edit
              id={id}
              item={item[id]}
              handleCloseEdit={handleCloseEdit}
              setData={setData}
            />
          )}
        </ListItem>
      )
    })
  }

  return <ul>{listItems()}</ul>
}

export default List
