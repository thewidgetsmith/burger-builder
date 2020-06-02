import React from 'react'
import Backdrop from '../Backdrop'
import Logo from '../Logo'
import Navigation from './Navigation'
import classes from './NavigationDrawer.module.css'

const NavigationDrawer = ({
  onToggle,
  isOpen
}) => {
  const combinedClasses = isOpen
    ? `${classes.NavigationDrawer} ${classes.Open}`
    : `${classes.NavigationDrawer} ${classes.Close}`

  return (
    <>
      <Backdrop show={isOpen} onClick={onToggle} />
      <div className={combinedClasses}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <Navigation />
        </nav>
      </div>
    </>
  )
}

export default NavigationDrawer
