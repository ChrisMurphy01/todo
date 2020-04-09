import React from 'react'
import styles from './styles.css'

const Textarea = ({ ...props }) => {
  return <textarea className={styles.textarea} {...props}></textarea>
}

export default Textarea
