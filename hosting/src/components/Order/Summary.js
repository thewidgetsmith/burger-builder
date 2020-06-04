import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'

const styles = {
  item: {
    textTransform: 'capitalize'
  }
}

const OrderSummary = ({
  onContinueOrder,
  onCancelOrder,
  ingredients,
  totalPrice,
  selections
}) => {
  const ingSummary = Object.keys(selections)
    .map((key, indx) => {
      const ing = ingredients.find(it => it.name === key)
      return (
        <li key={indx}>
          <span style={styles.item}>{ing.label}</span>:
          {selections[key]}
        </li>
      )
    })

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
  selections: {},
  totalPrice: 0.0
}

OrderSummary.propTypes = {
  selections: PropTypes.object,
  totalPrice: PropTypes.number,
  ingredients: PropTypes.array.isRequired,
  onCancelOrder: PropTypes.func.isRequired,
  onContinueOrder: PropTypes.func.isRequired
}

export default OrderSummary
