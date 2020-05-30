import React from 'react'
import styles from './Main.module.css'

const Main = (props) => (
  <>
    <div>Toolbar, Drawer, Backdrop</div>
    <main className={styles.Content}>
      {props.children}
    </main>
  </>
)

export default Main
