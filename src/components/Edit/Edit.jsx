import React, { useState } from 'react'
import styles from './styles.css'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'
import Label from '../Label/Label'
import FormRow from '../FormRow/FormRow'

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
    handleCloseEdit()
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
      <form
        className={styles.modal}
        onSubmit={handleOnSubmit}
        data-cy="edit-modal"
      >
        <FormRow>
          <Label>Name</Label>
          <Input
            type="text"
            value={newFormData.name}
            name="name"
            onChange={handleOnChange}
            data-cy="edit-modal-name"
          />
        </FormRow>
        <FormRow>
          <Label>Description</Label>
          <Textarea
            value={newFormData.desc}
            name="desc"
            onChange={handleOnChange}
            data-cy="edit-modal-desc"
          />
        </FormRow>
        <FormRow>
          <Button type="button" onClick={handleCloseEdit}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSaveEdit} data-cy="save">
            Save
          </Button>
        </FormRow>
      </form>
    </div>
  )
}

export default Edit
