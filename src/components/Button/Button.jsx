import React from 'react'
import styles from './styles.css'

const Button = ({ children, ...rest }) => {
  return (
    <button className={styles.button} {...rest}>
      {children}
    </button>
  )
}

export default Button
