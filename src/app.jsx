import React, { Component, Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './components/container/header/header.jsx';
import PageUpdate from './components/container/pageUpdate/pageUpdate'
import Top from './components/templates/top/top'
import Data from './components/container/data/data'
import About from './components/templates/about/about'
import Footer from './components/container/footer/footer.jsx';

import './css/base.css';
import './css/layout.css';
import styles from './css/app.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'React',
      fixedWrapper: false,
      toggleDrawer: false
    };
    this.wrapper = React.createRef()
  }

  fixedWrapper(state) {
    this.setState({fixedWrapper: state})
    if (state) {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.wrapper.current.style.top = -scrollTop + 'px'
    } else {
      let scrollTop = -parseInt(this.wrapper.current.style.top)
      this.wrapper.current.style.top = ''
      setTimeout(() => {
        window.scrollTo(0, scrollTop)
      }, 0)
    }
  }

  toggleDrawer(e) {
    this.setState({
      toggleDrawer: !this.state.toggleDrawer
    })
    // let elems = document.querySelectorAll('html, body')
    // if (!this.state.toggle) {
    //   for (var i = 0; i < elems.length; i++) {
    //     elems[i].style.overflow = 'hidden'
    //   }
    // } else {
    //   for (var i = 0; i < elems.length; i++) {
    //     elems[i].style.overflow = ''
    //   }
    // }
    if (!this.state.toggleDrawer) {
      this.fixedWrapper(true)
    } else {
      this.fixedWrapper(false)
    }
  }

  defaultDrawer(state) {
    this.setState({
      fixedWrapper: false,
      toggleDrawer: false
    })
  }

  render() {
    const fixed = this.state.fixedWrapper ? ' ' + styles.fixed : ''
    return (
      <div ref={this.wrapper} className={styles.wrapper + fixed}>
        <Header title={ this.state.title } toggleDrawer={ this.state.toggleDrawer } toggleDrawerFunc={(e) => {this.toggleDrawer(e)}} />
        <main className={styles.main}>
          <PageUpdate defaultDrawerFunc={(e) => {this.defaultDrawer(e)}} />
          <Switch>
            <Route exact path="/" component={ Top } />
            <Route path="/list" component={ Data } />
            <Route path="/about" component={ About } />
          </Switch>
        </main>
        <Footer />
      </div>
    )
  }
}

export default App