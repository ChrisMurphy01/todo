import React, { useState } from 'react'
import styles from './styles.css'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'

const Edit = ({ id, item, handleCloseEdit, handleSaveEdit, setData }) => {
  const [newFormData, setNewFormData] = useState({
    name: item.name || '',
    desc: item.desc || '',
  })

  function handleSaveEdit() {
    setData((prev) => {
      return {
        ...prev,
        [id]: {
          ...item,
          ...newFormData,
        },
      }
    })
  }

  function handleOnChange(e) {
    const target = e.target
    setNewFormData((prev) => {
      return {
        ...prev,
        [target.name]: target.value,
      }
    })
  }

  function handleOnSubmit(e) {
    e.preventDefault()
  }

  return (
    <div className={styles.modalBg}>
      <form className={styles.modal} onSubmit={handleOnSubmit}>
        <Input
          type="text"
          value={newFormData.name}
          name="name"
          onChange={handleOnChange}
        />
        <Textarea
          value={newFormData.desc}
          name="desc"
          onChange={handleOnChange}
        />
        <Button type="button" onClick={handleCloseEdit}>
          Cancel
        </Button>
        <Button type="submit" onClick={handleSaveEdit}>
          Save
        </Button>
      </form>
    </div>
  )
}

export default Edit
