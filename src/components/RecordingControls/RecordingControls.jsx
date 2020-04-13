import React from 'react'
import styles from './styles.css'
import Button from '../Button/Button'

const RecordingControls = ({
  controls,
  recorder,
  dispatchTodo,
  setFormData,
  setEdit,
}) => {
  const { record, stopRecord, play, clear } = controls
  const { isRecording, isPlaying } = recorder

  return (
    <div className={styles.controls}>
      <Button
        type="button"
        onClick={record}
        className={styles.controlButton}
        data-cy="record"
      >
        Record
        <span
          className={`${styles.record} ${isRecording && styles.recording}`}
        ></span>
      </Button>
      <Button
        type="button"
        onClick={stopRecord}
        className={styles.controlButton}
        data-cy="stop"
      >
        Stop
        <span className={`${styles.stop}`}></span>
      </Button>
      <Button
        type="button"
        onClick={() => play({ dispatchTodo, setFormData, setEdit })}
        className={styles.controlButton}
        data-cy="play"
      >
        Play
        <span
          className={`${styles.play} ${isPlaying && styles.playing}`}
        ></span>
      </Button>
      <Button
        type="button"
        onClick={clear}
        className={styles.controlButton}
        data-cy="clear"
      >
        Clear
        <span className={`${styles.clear}`}>{'{}'}</span>
      </Button>
    </div>
  )
}

export default RecordingControls
