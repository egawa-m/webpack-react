import React, { Component } from 'react'

import styles from './footer.css'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.pagetopClick = this.pagetopClick.bind(this)
  }

  pagetopClick(e) {
    e.preventDefault()
    const y = document.body.scrollTop || document.documentElement.scrollTop
    const toY = 0
    const scrollSpeed = 10
    let scrollTimer
    const scrollToAnimation = (y, toY, scrollSpeed) => {
      if (y > toY) {
        let scTop = Math.floor(y - (y / (scrollSpeed * 2)));
        window.scrollTo(0, scTop);
        scrollTimer = setTimeout(() => {scrollToAnimation(scTop, toY, scrollSpeed)}, scrollSpeed);
      } else {
        clearTimeout(scrollTimer);
        window.scrollTo(0, toY);
      }
    }
    scrollToAnimation(y, toY, scrollSpeed)
  }

  render() {
    return (
      <footer className={styles.footer}>
        <p className={styles.copyright}>©React, Inc.</p>
        <a className={styles.pagetop} href="#" onClick={this.pagetopClick}><span className={styles.icon}></span></a>
      </footer>
    )
  }
}

export default Footer