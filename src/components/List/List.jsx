import React from 'react'
import styles from './styles.css'
import ListItem from './ListItem'
import Button from '../Button/Button'
import Edit from '../Edit/Edit'

const List = ({
  data,
  removeTodo,
  editTodo,
  handleOnEditChange,
  handleSaveEdit,
  showEditTodo,
  handleCloseEdit,
  formData,
  edit,
}) => {
  function handleRemoveTodo(id) {
    removeTodo(id)
  }

  function listItems() {
    return Object.keys(data).map((id) => {
      const name = data[id].name
      const desc = data[id].desc

      return (
        <ListItem
          data-cy="todo-list-item"
          id={id}
          key={id}
          className={styles.listItem}
        >
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
              id={`edit-${id}`}
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
            {id === edit.id && (
              <Edit
                id={id}
                item={data[id]}
                handleOnEditChange={handleOnEditChange}
                handleCloseEdit={handleCloseEdit}
                formData={formData}
                editTodo={editTodo}
                edit={edit}
                handleSaveEdit={handleSaveEdit}
              />
            )}
          </div>
        </ListItem>
      )
    })
  }

  return <ul className={styles.list}>{listItems()}</ul>
}

export default List
