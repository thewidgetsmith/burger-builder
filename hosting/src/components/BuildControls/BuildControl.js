import React from 'react'
import PropTypes from 'prop-types'
import classes from './BuildControl.module.css'

const BuildControl = ({
  lessBtnIsDisabled,
  moreBtnIsDisabled,
  onLessClick,
  onMoreClick,
  label
}) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{label}</div>
    <button
      className={classes.Less}
      disabled={lessBtnIsDisabled}
      onClick={onLessClick}
    >
      Less
    </button>
    <button
      className={classes.More}
      disabled={moreBtnIsDisabled}
      onClick={onMoreClick}
    >
      More
    </button>
  </div>
)

BuildControl.defaultProps = {
  lessBtnIsDisabled: false,
  moreBtnIsDisabled: false
}

BuildControl.propTypes = {
  lessBtnIsDisabled: PropTypes.bool,
  moreBtnIsDisabled: PropTypes.bool,
  onLessClick: PropTypes.func.isRequired,
  onMoreClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default BuildControl
