import React from 'react';
import {render} from 'react-dom';

import './css/main.css';
import styles from './sample.css'

class App extends React.Component {
  constructor(props) { 
    super(props)
    this.state = { message: 'something' }
  }

  onChange(e) {
     this.setState( {message: e.target.value} )
  }

  render() {
    return (
      <div className = {styles.bg}>
        <input type="text" onChange = { this.onChange.bind(this) } />
        <p>{ this.state.message }</p>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));