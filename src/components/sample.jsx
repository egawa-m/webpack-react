import React from 'react';

import styles from './sample.css'

class Sample extends React.Component {
  constructor(props) { 
    super(props)
    this.state = {
    };
  }

  onChange(e) {
    return this.props.changeMessage(e.target.value)
  }

  render() {
    return (
      <div className = {styles.bg}>
        <input type="text" onChange = {() => { this.onChange.bind(this) }} />
        <p>{ this.state.message }</p>
      </div>
    )
  }
}

export default Sample