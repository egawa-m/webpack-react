import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import List from '../../templates/list/list'
import Detail from '../../templates/detail/detail'

const Data = () => {
  return (
    <Fragment>
      <Route exact path="/list" component={ List } />
      <Route path='/list/:id' component={ Detail } />
    </Fragment>
  )
}

export default Data