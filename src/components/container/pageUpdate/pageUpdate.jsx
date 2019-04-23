import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class pageUpdate extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.defaultDrawerFunc(false)
    }
  }

  render() {
    return null
  }
}

export default withRouter(pageUpdate)