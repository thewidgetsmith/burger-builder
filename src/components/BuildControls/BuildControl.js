import React from 'react'
import PropTypes from 'prop-types'
import classes from './BuildControl.module.css'

const BuildControl = ({
  removeBtnIsDisabled,
  ingredientLabel,
  onRemoveClick,
  onAddClick
}) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{ingredientLabel}</div>
    <button
      className={classes.Less}
      onClick={onRemoveClick}
      disabled={removeBtnIsDisabled}
    >
      Less
    </button>
    <button
      className={classes.More}
      onClick={onAddClick}
    >
      More
    </button>
  </div>
)

BuildControl.defaultProps = {
  removeBtnIsDisabled: false
}

BuildControl.propTypes = {
  removeBtnIsDisabled: PropTypes.bool,
  ingredientLabel: PropTypes.string.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired
}

export default BuildControl
