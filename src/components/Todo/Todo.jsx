import React, { useReducer, useState } from 'react'
import styles from './styles.css'

import AddTodo from '../AddTodo/AddTodo'
import List from '../List/List'
import Wrapper from '../Wrapper/Wrapper'

import uid from 'uid'

import useRecorder from '../../useRecorder'
import RecordingControls from '../RecordingControls/RecordingControls'

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const created = Date.now()
      const newTodo = {
        [uid()]: {
          ...action.formData,
          created: created,
        },
      }
      action.dispatchRecorder({
        type: action.type,
        id: action.id,
        payload: newTodo,
      })
      return {
        ...state,
        ...newTodo,
      }
    case 'REMOVE':
      delete state[action.id]

      action.dispatchRecorder({
        type: action.type,
        id: action.id,
        payload: newTodo,
      })

      return { ...state }
    case 'EDIT':
      action.dispatchRecorder({
        type: action.type,
        id: action.id,
        payload: {
          ...state[action.id],
          name: action.newFormData.name,
          desc: action.newFormData.desc,
        },
      })
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          name: action.newFormData.name,
          desc: action.newFormData.desc,
        },
      }
    case 'CLEAR':
      return {}
    case 'RECORDER_ADD':
      const id = Object.keys(action.data)[0]
      return {
        ...state,
        [id]: {
          ...action.data[id],
        },
      }
    case 'RECORDER_EDIT':
      return {
        ...state,
        [action.data.id]: {
          name: action.data.name,
          desc: action.data.desc,
        },
      }
    case 'RECORDER_REMOVE':
      delete state[action.id]

      return {
        ...state,
      }
    default:
      throw new Error()
  }
}

const initialFormValues = {
  name: '',
  desc: '',
}

const initialEditValues = { id: '', name: '', desc: '' }

const Todo = () => {
  const [data, dispatchTodo] = useReducer(todoReducer, {})
  const [formData, setFormData] = useState(initialFormValues)
  const [edit, setEdit] = useState(initialEditValues)

  const { controls, recorder, dispatchRecorder } = useRecorder()

  function handleOnChange(e) {
    const target = e.target

    setFormData((prev) => ({ ...prev, [target.name]: target.value }))
  }

  function handleOnSubmit(e) {
    e.preventDefault()

    addTodo(formData)

    setFormData(initialFormValues)
  }

  function addTodo(formData) {
    dispatchTodo({ type: 'ADD', formData, dispatchRecorder })
  }

  function handleOnEditChange(e) {
    const target = e.target

    setEdit((prev) => ({ ...prev, [target.name]: target.value }))
  }

  function handleSaveEdit(e) {
    e.preventDefault()
    dispatchTodo({
      type: 'EDIT',
      id: edit.id,
      newFormData: { name: edit.name, desc: edit.desc },
      dispatchRecorder,
    })

    setEdit(initialEditValues)
  }

  function showEditTodo(id) {
    setEdit((prev) => ({ ...prev, id: id }))
  }

  function handleCloseEdit() {
    setEdit((prev) => ({ ...prev, id: '' }))
  }

  function editTodo() {
    dispatchTodo({
      type: 'EDIT',
      newFormData: {
        name: edit.name,
        desc: edit.desc,
      },
      id: edit.id,
      dispatchRecorder,
    })
  }

  function removeTodo(id) {
    dispatchTodo({ type: 'REMOVE', id, dispatchRecorder })
  }

  return (
    <Wrapper>
      <h1>Todo</h1>
      <RecordingControls
        controls={controls}
        recorder={recorder}
        dispatchTodo={dispatchTodo}
        setFormData={setFormData}
        setEdit={setEdit}
      />
      <AddTodo
        formData={formData}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
      />
      <List
        data={data}
        editTodo={editTodo}
        removeTodo={removeTodo}
        formData={formData}
        handleOnEditChange={handleOnEditChange}
        setEdit={setEdit}
        handleSaveEdit={handleSaveEdit}
        showEditTodo={showEditTodo}
        handleCloseEdit={handleCloseEdit}
        edit={edit}
      />
    </Wrapper>
  )
}

export default Todo
