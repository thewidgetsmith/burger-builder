import React from 'react'
import PropTypes from 'prop-types'
import { DrawerToggle, Logo, Navigation } from 'src/components'
import classes from './TopBar.module.css'

const TopBar = (props) => (
  <header className={classes.TopBar}>
    <DrawerToggle onClick={props.handleToggleDrawer} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <Navigation />
    </nav>
  </header>
)

TopBar.propTypes = {
  handleToggleDrawer: PropTypes.func.isRequired
}

export default TopBar
