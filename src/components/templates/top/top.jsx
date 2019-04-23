import React, { Component, Fragment } from 'react'
import {Helmet} from "react-helmet"
import Heading from '../../modules/heading/heading.jsx'
import Sample from '../../modules/sample/sample.jsx'

class Top extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Top',
      message: 'something'
    }
  }

  changeMessage(e) {
    this.setState({message: e.target.value})
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>React - {this.state.title}</title>
          <meta name="description" content={`${this.state.title} description`} />
        </Helmet>
        <Heading title={this.state.title} />
        <Sample changeFunc={(e) => {this.changeMessage(e)}} message={this.state.message} />
      </Fragment>
    )
  }
}

export default Top