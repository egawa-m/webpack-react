import React, { Component, Fragment } from 'react'
import {Helmet} from "react-helmet"
import Heading from '../../modules/heading/heading.jsx'

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'About'
    }
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>React - {this.state.title}</title>
          <meta name="description" content={`${this.state.title} description`} />
        </Helmet>
        <Heading title={this.state.title} />
      </Fragment>
    )
  }
}

export default About