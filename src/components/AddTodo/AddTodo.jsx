import React, { useState } from 'react'
import styles from './styles.css'

import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'
import Button from '../Button/Button'
import FormRow from '../FormRow/FormRow'
import Label from '../Label/Label'

const AddTodo = ({ handleOnChange, handleOnSubmit, formData }) => {
  return (
    <form onSubmit={(e) => handleOnSubmit(e)}>
      <FormRow>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          value={formData?.name}
          onChange={handleOnChange}
        />
      </FormRow>
      <FormRow>
        <Label for="desc">Description</Label>
        <Textarea
          name="desc"
          id="desc"
          value={formData?.desc}
          onChange={handleOnChange}
        />
      </FormRow>
      <FormRow>
        <Button type="submit" data-cy="add">
          Add
        </Button>
      </FormRow>
    </form>
  )
}

export default AddTodo
