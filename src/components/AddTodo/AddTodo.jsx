import React, { useState } from 'react'
import styles from './styles.css'

import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'
import Button from '../Button/Button'

import uid from 'uid'

const initialValues = { name: '', desc: '' }

const AddTodo = ({ setData }) => {
  const [formData, setFormData] = useState(initialValues)

  function handleOnChange(e) {
    const target = e.target

    setFormData((prev) => ({ ...prev, [target.name]: target.value }))
  }

  function handleOnSubmit(e) {
    e.preventDefault()
    const created = Date.now()

    setData((prev) => [
      ...prev,
      {
        [uid()]: {
          ...formData,
          created: created,
        },
      },
    ])

    setFormData(initialValues)
  }

  return (
    <form onSubmit={(e) => handleOnSubmit(e)}>
      <Input
        type="text"
        placeholder="Name&hellip;"
        name="name"
        value={formData.name}
        onChange={handleOnChange}
      />
      <Textarea
        placeholder="Description&hellip;"
        name="desc"
        value={formData.desc}
        onChange={handleOnChange}
      />
      <Button type="submit" data-cy="add">
        Add
      </Button>
    </form>
  )
}

export default AddTodo
