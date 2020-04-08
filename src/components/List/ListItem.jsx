import React from 'react'
import styles from './styles.css'

const ListItem = ({ children, ...rest }) => {
  return <li {...rest}>{children}</li>
}

export default ListItem
