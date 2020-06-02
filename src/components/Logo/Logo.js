import React from 'react'
import classes from './Logo.module.css'

import BURGER_LOGO from '../../assets/images/burger_logo.png'

const Logo = (props) => (
  <div className={classes.Logo}>
    <img src={BURGER_LOGO} alt='Burger Builder Logo' />
  </div>
)

export default Logo
