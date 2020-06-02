import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'

const styles = {
  item: {
    textTransform: 'capitalize'
  }
}

const OrderSummary = ({
  ingredients,
  totalPrice,
  onCancelOrder,
  onContinueOrder
}) => {
  const ingSummary = Object.keys(ingredients)
    .map((key, indx) => (
      <li key={indx}>
        <span style={styles.item}>{key}</span>:
        {ingredients[key]}
      </li>
    ))

  React.useEffect(() => {
    console.log('[PROFILE] order summary updated')
  })

  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingSummary}
      </ul>
      <p><strong>Total Price: {totalPrice.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button type='Danger' onClick={onCancelOrder}>CANCEL</Button>
      <Button type='Success' onClick={onContinueOrder}>CONTINUE</Button>
    </>
  )
}

OrderSummary.defaultProps = {
  ingredients: {},
  totalPrice: 0.0
}

OrderSummary.propTypes = {
  ingredients: PropTypes.object,
  totalPrice: PropTypes.number,
  onCancelOrder: PropTypes.func.isRequired,
  onContinueOrder: PropTypes.func.isRequired
}

export default OrderSummary
