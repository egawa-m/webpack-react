import React from 'react';
import {render} from 'react-dom';

import Sample from './components/sample.jsx';

import './app.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'something'
    };
  }

  changeFunc(value) {
    this.setState( {message: value} )
  }

  render() {
    return (
      <div>
        <Sample changeFunc={() => { this.changeFunc() }} />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));