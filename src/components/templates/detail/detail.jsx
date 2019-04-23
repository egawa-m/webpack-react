import React, { Component, Fragment } from 'react'
import {Helmet} from "react-helmet"
import axios from 'axios'
import Heading from '../../modules/heading/heading.jsx'

import styles from './detail.css'

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Detail',
      data: [],
      loading: false
    }
  }

  requestData() {
    this.setState({loading: true})
    const id = this.props.match.params.id
    const url = `/json/detail${id}.json`
    axios.get(url, {timeout: 3000})
      .then(response => {
        let oldData = this.state.data
        let newData = oldData.concat(response.data.list)
        this.setState({data: newData})
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.setState({loading: false})
      })
  }

  componentDidMount() {
    this.requestData()
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>React - {this.state.title}</title>
          <meta name="description" content={`${this.state.title} description`} />
        </Helmet>
        <Heading title={this.state.title} />
        {this.state.loading && <div className='loader'></div>}
        {(() => {
          if (this.state.data[0]) {
            return (
              <div className={styles.item}>
                <p className={styles.title}>{this.state.data[0].title}</p>
                <div className={styles.photo}>
                  <img src={require(`../../../img/${this.state.data[0].image}`)} alt="" />
                </div>
              </div>
            )
          }
        })()}
      </Fragment>
    )
  }
}

export default Detail
