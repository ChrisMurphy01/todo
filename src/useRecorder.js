import { useReducer } from 'react'

const initialRecordingValues = {
  isRecording: false,
  isPlaying: false,
  steps: [],
}

function recordingReducer(state, action) {
  switch (action.type) {
    case 'PLAY':
      return {
        isRecording: false,
        isPlaying: true,
        steps: [...state.steps],
      }
    case 'STOP_PLAY':
      return {
        isRecording: false,
        isPlaying: false,
        steps: [...state.steps],
      }
    case 'START_RECORDING':
      return {
        isRecording: true,
        isPlaying: false,
        steps: [...state.steps],
      }
    case 'STOP_RECORDING':
      localStorage.setItem('todoRecording', JSON.stringify(state))
      return {
        isRecording: false,
        isPlaying: false,
        steps: [...state.steps],
      }
    case 'ADD':
      if (!state.isRecording) {
        return state
      } else {
        return {
          ...state,
          steps: [...state.steps, { [action.type]: action.payload }],
        }
      }
    case 'REMOVE':
      if (!state.isRecording) {
        return state
      } else {
        return {
          ...state,
          steps: [...state.steps, { [action.type]: action.id }],
        }
      }
    case 'EDIT':
      if (!state.isRecording) {
        return state
      } else {
        return {
          ...state,
          steps: [...state.steps, { [action.type]: action }],
        }
      }
    case 'CLEAR':
      localStorage.setItem('todoRecording', {})
      return initialRecordingValues
    default:
      throw new Error()
  }
}

const useRecorder = () => {
  const [recorder, dispatchRecorder] = useReducer(
    recordingReducer,
    initialRecordingValues
  )

  const record = () => {
    dispatchRecorder({ type: 'START_RECORDING' })
  }

  const stopRecord = () => {
    dispatchRecorder({ type: 'STOP_RECORDING' })
  }

  const play = ({ dispatchTodo, setFormData, setEdit }) => {
    const storageData = localStorage.getItem('todoRecording')
    const recording = storageData ? JSON.parse(storageData) : {}
    const steps = recording.steps

    dispatchRecorder({ type: 'PLAY' })
    dispatchTodo({ type: 'CLEAR' })
    setFormData({ name: '', desc: '' })

    function buildPlayBackSteps(steps) {
      const playBackSteps = []

      steps.forEach((step) => {
        const type = Object.keys(step)[0]
        let id = Object.keys(step[type])[0]

        switch (type) {
          case 'ADD':
            playBackSteps.push({
              type: 'UPDATE_FORM_DATA_STATE',
              payload: { [id]: step[type][id] },
            })
            playBackSteps.push({
              type: 'REPLACE_STATE',
              payload: { [id]: step[type][id] },
            })
            break
          case 'EDIT':
            id = step[type].id
            playBackSteps.push({
              type: 'OPEN_MODAL',
              payload: { [id]: { name: '', desc: '' } },
            })
            playBackSteps.push({
              type: 'UPDATE_EDIT_FORM_STATE',
              payload: { [id]: step[type].payload },
            })
            playBackSteps.push({
              type: 'CLOSE_MODAL',
              payload: { [id]: step[type].payload },
            })
            break
          case 'REMOVE':
            playBackSteps.push({
              type: 'REMOVE',
              payload: step.REMOVE,
            })
            break
          default:
            throw new Error('Unknown action')
        }
      })
      return playBackSteps
    }

    let playBackSteps = buildPlayBackSteps(steps)

    function populateAddTodoForm(name, desc) {
      setFormData({ name, desc })
    }

    function playStep(step) {
      const { type, payload } = step
      const id = Object.keys(payload)[0]

      switch (type) {
        case 'UPDATE_FORM_DATA_STATE':
          populateAddTodoForm(payload[id].name, payload[id].desc)
          break
        case 'REPLACE_STATE':
          dispatchTodo({
            type: 'RECORDER_ADD',
            data: payload,
          })
          break
        case 'OPEN_MODAL':
          const editButton = document.getElementById(`edit-${id}`)
          editButton.click()
          break
        case 'UPDATE_EDIT_FORM_STATE':
          setEdit((prev) => ({
            ...prev,
            name: payload[id].name,
            des: payload[id].desc,
          }))
          break
        case 'CLOSE_MODAL':
          const closeButton = document.getElementById(`close-modal`)
          closeButton.click()
          dispatchTodo({
            type: 'RECORDER_EDIT',
            data: { id: id, name: payload[id].name, desc: payload[id].desc },
          })
        case 'REMOVE':
          dispatchTodo({ type: 'RECORDER_REMOVE', id: payload })
      }
    }

    function playBack(length, i) {
      setTimeout(() => {
        playStep(playBackSteps[i])
        if (i < length - 1) {
          i++

          playBack(length, i)
        } else {
          dispatchRecorder({ type: 'STOP_PLAY' })
        }
      }, 1000)
    }
    playBack(playBackSteps.length, 0)
  }

  const clear = () => {
    dispatchRecorder({ type: 'CLEAR' })
  }

  return {
    controls: { record, stopRecord, play, clear },
    recorder,
    dispatchRecorder,
  }
}

export default useRecorder
