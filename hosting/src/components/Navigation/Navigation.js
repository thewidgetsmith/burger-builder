import React from 'react'
import NavigationItem from './NavigationItem'
import classes from './Navigation.module.css'

const Navigation = () => (
  <ul className={classes.Navigation}>
    <NavigationItem link='/' active>Burger Builder</NavigationItem>
    <NavigationItem link='/'>Checkout</NavigationItem>
  </ul>
)

export default Navigation
