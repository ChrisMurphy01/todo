import React from 'react'
import styles from './styles.css'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'
import Label from '../Label/Label'
import FormRow from '../FormRow/FormRow'

const Edit = ({
  handleCloseEdit,
  handleOnEditChange,
  handleSaveEdit,
  edit,
}) => {
  return (
    <div className={styles.modalBg}>
      <form className={styles.modal} data-cy="edit-modal">
        <FormRow>
          <Label>Name</Label>
          <Input
            type="text"
            value={edit.name}
            name="name"
            onChange={handleOnEditChange}
            data-cy="edit-modal-name"
          />
        </FormRow>
        <FormRow>
          <Label>Description</Label>
          <Textarea
            value={edit.desc}
            name="desc"
            onChange={handleOnEditChange}
            data-cy="edit-modal-desc"
          />
        </FormRow>
        <FormRow>
          <Button type="button" onClick={handleCloseEdit} id="close-modal">
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
