import React from 'react'
import { NavigationDrawer } from 'src/components'

import TopBar from './TopBar'
import classes from './Main.module.css'

const Main = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const handleDrawerToggle = () => setIsDrawerOpen(!isDrawerOpen)

  return (
    <>
      <TopBar handleToggleDrawer={handleDrawerToggle} />
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onToggle={handleDrawerToggle}
      />
      <main className={classes.Content}>
        {props.children}
      </main>
    </>
  )
}

export default Main
