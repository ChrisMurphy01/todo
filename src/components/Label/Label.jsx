import React from 'react'
import styles from './styles.css'

const Label = ({ children }) => {
  return <label className={styles.label}>{children}</label>
}

export default Label
