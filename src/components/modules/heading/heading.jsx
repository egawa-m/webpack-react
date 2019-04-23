import React from 'react'

import styles from './heading.css'

const Heading = ({title}) => {
  return (
    <h1 className={styles.heading}>{title}</h1>
  )
}

export default Heading