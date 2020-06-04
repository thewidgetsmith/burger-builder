import React from 'react'
import { Modal } from 'src/components'

const withErrorHandler = (WrappedComponent, error) => (props) => {
  const [message, setMessage] = React.useState(null)
  if (error && error.message) {
    setMessage(error.message)
  }

  return (
    <>
      <Modal show={message} onBackdropClick={() => setMessage(null)}>
        {message}
      </Modal>
      <WrappedComponent {...props} />
    </>
  )
}

export default withErrorHandler
