import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './dataList.css'

class DataList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: false
    }
  }

  requestData() {
    this.setState({loading: true})
    axios.get('/json/list.json', {timeout: 3000})
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
        {this.state.loading && <div className='loader'></div>}
        <ul className={styles.list}>
          {this.state.data.map((index, key) =>
            <li key={key}>
              <Link to={`/list/${index.id}`}>
                <div className={styles.photo}>
                  <img src={require(`../../../img/${index.image}`)} alt="" />
                </div>
                <div className={styles.text}>
                  <p className={styles.title}>{index.title}</p>
                  <span className={styles.icon}></span>
                </div>
              </Link>
            </li>
          )}
        </ul>
      </Fragment>
    )
  }
}

export default DataList