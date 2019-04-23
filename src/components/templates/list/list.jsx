import React, { Component, Fragment } from 'react'
import {Helmet} from "react-helmet"
import Heading from '../../modules/heading/heading.jsx'
import DataList from '../../modules/dataList/dataList.jsx'

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'List'
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
        <DataList />
      </Fragment>
    )
  }
}

export default List