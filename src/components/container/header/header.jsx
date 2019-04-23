import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './header.css'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fixedNav: false
    };
    this.nav = React.createRef()
    this.drawerClick = this.drawerClick.bind(this)
    this.fixedNav = this.fixedNav.bind(this)
  }

  componentDidMount() {
    // this.fixedClass = 'is-fixed'
    // this.time
    setTimeout(() => {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.navPos = this.nav.current.getBoundingClientRect().top + this.scrollTop
    }, 0)
    window.addEventListener('scroll', this.fixedNav, true)
    window.addEventListener('load', this.fixedNav, true)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fixedNav, true)
    window.removeEventListener('load', this.fixedNav, true)
  }

  fixedNav() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    if (scrollTop >= this.navPos) {
      this.setState({
        fixedNav: true
      })
    } else {
      this.setState({
        fixedNav: false
      })
    }
    // if ( this.time ) return
    // this.time = setTimeout( () => {
    //   this.time = 0
    //   let scroll = document.documentElement.scrollTop || document.body.scrollTop
    //   if (scroll > this.navPos) {
    //     this.setState({
    //       fixed: true
    //     })
    //   } else {
    //     this.setState({
    //       fixed: false
    //     })
    //   }
    // }, 0)
  }

  drawerClick(e) {
    this.props.toggleDrawerFunc(e)
  }

  render() {
    const toggle = this.props.toggleDrawer ? ' ' + styles.open : ''
    const fixed = this.state.fixedNav ? ' ' + styles.fixed : ''
    return (
      <header className={styles.title}>
        <h1 className={styles.heading}>{this.props.title}</h1>
        <div className={styles.drawer + toggle} onClick={this.drawerClick}>
          <span className={styles.burgar}>
            <span className={styles.patty}></span>
          </span>
        </div>
        {this.props.toggleDrawer ? <div className={styles.overlay} onClick={this.drawerClick}></div> : null}
        <nav ref={this.nav} className={styles.nav + fixed + toggle}>
          <ul className={styles.list}>
            <li><NavLink exact to="/" activeClassName={styles.current}>Home</NavLink></li>
            <li><NavLink to="/list" activeClassName={styles.current}>List</NavLink></li>
            <li><NavLink to="/about" activeClassName={styles.current}>About</NavLink></li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header