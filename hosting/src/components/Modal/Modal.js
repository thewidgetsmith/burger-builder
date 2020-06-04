import React from 'react'
import Backdrop from '../Backdrop'
import classes from './Modal.module.css'

const Modal = ({
  onBackdropClick,
  children,
  show
}) => (
  <>
    <Backdrop show={show} onClick={onBackdropClick} />
    <div
      className={classes.Modal}
      style={{
        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0'
      }}
    >
      {children}
    </div>
  </>
)

export default React.memo(
  Modal,
  // re-render order summary only
  // when `props.show` changes
  (prevProps, nextProps) =>
    prevProps.show === nextProps.show &&
    prevProps.children === nextProps.children
)
