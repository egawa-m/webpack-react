import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './sample.css'

const propTypes = {
  changeFunc: PropTypes.func,
}

class Sample extends Component {
  constructor(props) { 
    super(props)
  }

  render() {
    return (
      <div className={styles.bg}>
        <input className={styles.input} type="text" onChange={this.props.changeFunc} />
        <p className={styles.text}>{this.props.message}</p>
      </div>
    )
  }
}

Sample.propTypes = propTypes
export default Sample