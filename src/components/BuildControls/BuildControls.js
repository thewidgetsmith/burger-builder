import React from 'react'
import PropTypes from 'prop-types'
import BuildControl from './BuildControl'
import classes from './BuildControls.module.css'

const controls = [
  { label: 'Pickle', type: 'pickle' },
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Pastrami', type: 'pastrami' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const BuildControls = ({
  price,
  disabled,
  orderIsInvalid,
  onOrderButtonClick,
  onAddIngredientClick,
  onRemoveIngredientClick
}) => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>{price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        ingredientLabel={ctrl.label}
        removeBtnIsDisabled={disabled[ctrl.type]}
        onAddClick={() => onAddIngredientClick(ctrl.type)}
        onRemoveClick={() => onRemoveIngredientClick(ctrl.type)}
      />
    ))}
    <button
      onClick={onOrderButtonClick}
      className={classes.OrderButton}
      disabled={orderIsInvalid}
    >
      ORDER NOW
    </button>
  </div>
)

BuildControls.propTypes = {
  price: PropTypes.number.isRequired,
  disabled: PropTypes.object.isRequired,
  orderIsInvalid: PropTypes.bool.isRequired,
  onRemoveIngredientClick: PropTypes.func.isRequired,
  onAddIngredientClick: PropTypes.func.isRequired,
  onOrderButtonClick: PropTypes.func.isRequired
}

export default BuildControls
