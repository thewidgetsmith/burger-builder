import React from 'react'
import PropTypes from 'prop-types'
import BuildControl from './BuildControl'
import classes from './BuildControls.module.css'

const BuildControls = ({
  onLessIngredientClick,
  onMoreIngredientClick,
  onOrderButtonClick,
  lessDisabledInfo,
  moreDisabledInfo,
  orderIsInvalid,
  ingredients,
  totalPrice
}) => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>{totalPrice.toFixed(2)}</strong></p>
    {ingredients.map(ing => (
      <BuildControl
        key={ing.name}
        label={ing.label}
        moreBtnIsDisabled={moreDisabledInfo[ing.name]}
        lessBtnIsDisabled={lessDisabledInfo[ing.name]}
        onMoreClick={() => onMoreIngredientClick(ing.name)}
        onLessClick={() => onLessIngredientClick(ing.name)}
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

BuildControls.defaultProps = {
  selections: {}
}

BuildControls.propTypes = {
  onLessIngredientClick: PropTypes.func.isRequired,
  onMoreIngredientClick: PropTypes.func.isRequired,
  onOrderButtonClick: PropTypes.func.isRequired,
  lessDisabledInfo: PropTypes.object.isRequired,
  moreDisabledInfo: PropTypes.object.isRequired,
  orderIsInvalid: PropTypes.bool.isRequired,
  totalPrice: PropTypes.number.isRequired
}

export default BuildControls
