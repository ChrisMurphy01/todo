import React from 'react'
import styles from './styles.css'

const Button = ({ children, ...rest }) => {
  return <button {...rest}>{children}</button>
}

export default Button
